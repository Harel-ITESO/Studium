import {
    Controller,
    Post,
    Get,
    Body,
    Req,
    Res,
    UnauthorizedException,
    BadRequestException,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { CreateUserDto } from '../users/dto/create-user.dto';
  import { AuthGuard } from '@nestjs/passport';
  import { Request, Response } from 'express';
  import { AuthenticatedRequest } from './controller/express-controller';
  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    /** POST - /studium/api/auth/login */
    @Post('login')
    public async logIn(
      @Body('loginData') loginData: { email: string; password: string },
    ) {
      if (!loginData)
        throw new BadRequestException('Data was not provided correctly');
      const { email, password } = loginData;
      try {
        const token = await this.authService.logIn(email, password);
        return { token };
      } catch (e) {
        console.error(e);
        throw new UnauthorizedException('User data was not validated');
      }
    }
  
    /** POST - /studium/api/auth/register */
    @Post('register')
    public async register(@Body('registerData') data: CreateUserDto) {
      if (await this.authService.register(data)) return { success: true };
    }
  
    /** GET - /studium/api/auth/google */
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req: AuthenticatedRequest) {}
  
    /** GET - /studium/api/auth/google/callback */
    @Get('google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req: AuthenticatedRequest, @Res() res: Response) {
      console.log('Authenticated User:', req.user);
  
      res.json({
        message: 'Google authentication successful!',
        user: req.user,
      });
    }
  
    /** GET - /studium/api/auth/facebook */
    @Get('facebook')
    @UseGuards(AuthGuard('facebook'))
    async facebookAuth(@Req() req: AuthenticatedRequest) {}
  
    /** GET - /studium/api/auth/facebook/callback */
    @Get('facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    async facebookAuthRedirect(@Req() req: AuthenticatedRequest, @Res() res: Response) {
      console.log('Authenticated Facebook User:', req.user);
  
      res.json({
        message: 'Facebook authentication successful!',
        user: req.user,
      });
    }
  }
  