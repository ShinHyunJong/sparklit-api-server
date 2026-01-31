import { Body, Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
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
  register(
    @Body()
    registerBody: { email: string; password: string; country?: string },
  ) {
    return this.authSerivice.registerUser(
      registerBody.email,
      registerBody.password,
      registerBody.country,
    );
  }

  @Post('/check/email')
  checkEmail(@Body() body: { email: string }) {
    return this.authSerivice.checkEmail(body.email);
  }

  @Post('/verification/send')
  sendVerification(@Body() body: { email: string }) {
    return this.authSerivice.sendVerificationEmail(body.email);
  }

  @Post('/verification/verify')
  verifyCode(
    @Body() body: { email: string; code: string; verificationId: number },
  ) {
    return this.authSerivice.verifyEmailCode(
      body.email,
      body.code,
      body.verificationId,
    );
  }

  @Post('/verification/password')
  changePasswordWithCode(
    @Body()
    body: {
      email: string;
      code: string;
      verificationId: number;
      newPassword: string;
    },
  ) {
    return this.authSerivice.changePasswordWithCode(
      body.email,
      body.code,
      body.verificationId,
      body.newPassword,
    );
  }
}
