import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async register(dto: SignUpDto) {
    try {
      const { email, password } = dto;
      const hashedPassword = await argon.hash(password);
      const user = await this.prisma.user.create({
        data: {
          email,
          hash: hashedPassword,
        },
      });
      const { hash, ...userWithoutHash } = user;
      return userWithoutHash;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }
  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
      if (!user) {
        throw new ForbiddenException('Wrong credentials');
      }
      const isPasswordValid = await argon.verify(user.hash, dto.password);
      if (!isPasswordValid) {
        throw new ForbiddenException('Wrong credentials');
      }
      const { hash, ...userWithoutHash } = user;
      return {
        user: userWithoutHash,
        token: await this.signToken(user),
      };
    } catch (error) {
      throw error;
    }
  }

  async signToken(user: User) {
    const secret = this.configService.get('JWT_SECRET');
    const payload = {
      sub: user.id,
      email: user.email,
    };
    return this.jwtService.signAsync(payload, { secret, expiresIn: '15m' });
  }
}
