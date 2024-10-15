import {
    Controller,
    Post,
    Body,
    BadRequestException,
    Res,
    HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CookieOptions, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dto/register-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    /** POST - /studium/api/auth/login */
    @Post('login')
    @HttpCode(204)
    public async logIn(
        @Body('loginData')
        loginData: {
            email: string;
            password: string;
        },
        @Res({ passthrough: true }) res: Response,
    ) {
        if (!loginData)
            throw new BadRequestException('Data was not provided correctly');
        const { email, password } = loginData;
        const token = await this.authService.logIn(email, password);
        const env = this.configService.get<string>('NODE_ENV');
        const cookieOptions = {
            httpOnly: true,
            sameSite: env === 'development' ? false : 'none',
            secure: env === 'development' ? false : true,
            maxAge: 365 * 24 * 60 * 60 * 1000,
            signed: true,
        } as CookieOptions;

        res.cookie('authentication', token, cookieOptions);
    }

    /** POST - /studium/api/auth/register */
    @Post('register')
    public async register(@Body('registerData') data: RegisterUserDto) {
        if (!data)
            throw new BadRequestException('Data was not provided correctly');
        const { password, doubleCheckPassword } = data;
        if (password !== doubleCheckPassword)
            throw new BadRequestException('Passwords do not match');
        const user = CreateUserDto.fromRegisterData(data);
        if (await this.authService.register(user)) return { succesfull: true };
    }
}
