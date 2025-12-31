import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authSerivice: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    return this.authSerivice.getUserDetail(req.user.id);
  }

  @Post('login')
  login(@Body() loginBody: { email: string; password: string }) {
    return this.authSerivice.loginUser(loginBody.email, loginBody.password);
  }

  @Post('register')
  register(@Body() registerBody: { email: string; password: string }) {
    return this.authSerivice.registerUser(
      registerBody.email,
      registerBody.password,
    );
  }

  @Post('/check/email')
  checkEmail(@Body() body: { email: string }) {
    return this.authSerivice.checkEmail(body.email);
  }
}
