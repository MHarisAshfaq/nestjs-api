import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
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
      return userWithoutHash;
    } catch (error) {
      throw error;
    }
  }
}
