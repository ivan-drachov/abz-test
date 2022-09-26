import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { count } from 'console';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: number, req: Request){

    const decodedUserInfo = req.user as { id: number; email: string };
    const foundUser = await this.prisma.user.findUnique({ where: { id: Number(id) } });

    if (!foundUser) {
      throw new NotFoundException();
    }
    return {"found_user":foundUser, "current_user": decodedUserInfo};
  }

  async getMyUser(id: number, req: Request) {
    const decodedUserInfo = req.user as { id: number; email: string };

    const foundUser = await this.prisma.user.findUnique({ where: { id: Number(id) } });

    if (!foundUser) {
      throw new NotFoundException();
    }

    if (foundUser.id !== decodedUserInfo.id) {
      throw new ForbiddenException();
    }

    delete foundUser.hashedPassword;

    return { user: foundUser };
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: { id: true, email: true, phone: true, name: true, position: true, image: true }, 
      orderBy: [
        {
          id: 'desc'
        }
      ]
    });
    return  users;
  }
  /*
  async getUsers(limit = 6, offset = 0) {
    const users = await this.prisma.user.findMany({
      select: { id: true, email: true, phone: true, name: true, position: true }, take: limit, skip: offset, 
    });
    const usersCount = await this.prisma.user.count();
    return { count: usersCount, page: offset/limit+1, users:users, };
  }
  */
}
