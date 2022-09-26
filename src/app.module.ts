import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PositionsModule } from './positions/positions.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, FilesModule, ServeStaticModule.forRoot({
    rootPath: path.resolve(__dirname, 'images'),
  }), PositionsModule,],
})
export class AppModule {}
