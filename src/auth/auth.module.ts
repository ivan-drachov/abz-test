import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [JwtModule, PassportModule, FilesModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
