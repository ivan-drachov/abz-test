import { Body, Controller, Get, Post, Request, Response, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { SigninDto } from './dto/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @UseInterceptors(FileInterceptor('image'))
  signup(@Body() dto: AuthDto, @UploadedFile() image) {
    return this.authService.signup(dto, image);
  }

  @Post('signin')
  async signin(@Request() req, @Response() res, @Body() dto: SigninDto) {
    return this.authService.signin(dto, req, res);
  }

  @Get('signout')
  signout(@Request() req, @Response() res) {
    return this.authService.signout(req, res);
  }
}
