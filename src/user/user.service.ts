import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async updateUser(userId: number, body: EditUserDto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...body,
      },
    });
    const { hash, ...userWithoutHash } = user;
    return userWithoutHash;
  }
}
