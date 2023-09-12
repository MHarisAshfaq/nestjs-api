import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}
  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prismaService.bookmark.create({
      data: {
        ...dto,
        userId,
      },
    });
    return bookmark;
  }

  async getBookmarks(userId: number) {
    const bookmarks = await this.prismaService.bookmark.findMany({
      where: {
        userId,
      },
    });
    return bookmarks;
  }

  async getBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prismaService.bookmark.findFirst({
      where: {
        userId,
        id: bookmarkId,
      },
    });
    return bookmark;
  }

  async updateBookmarkById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    const bookmark = await this.prismaService.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }
    return this.prismaService.bookmark.update({
      where: {
        userId,
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkById(userId: number, bookmarkId: number) {
    const bookmark = await this.prismaService.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }
    return this.prismaService.bookmark.delete({
      where: {
        userId,
        id: bookmarkId,
      },
    });
  }
}
