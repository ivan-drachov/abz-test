import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  constructor(private prisma: PrismaService) {}
  create(createPositionDto: CreatePositionDto) {
    return 'This action adds a new position';
  }

  async findAll() {
    const positions = await this.prisma.position.findMany();
    if(!positions) throw new NotFoundException('Ooops!!! Something went wrong...')
    return {
      'success': true,
      'positions': positions
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} position`;
  }

  update(id: number, updatePositionDto: UpdatePositionDto) {
    return `This action updates a #${id} position`;
  }

  remove(id: number) {
    return `This action removes a #${id} position`;
  }
}
