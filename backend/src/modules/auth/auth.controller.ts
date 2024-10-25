import {
    Controller,
    Post,
    Body,
    BadRequestException,
    Res,
    HttpCode,
    UseGuards,
    Get,
    Req,
    Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CookieOptions, Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dto/register-user.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { GoogleGuard } from './guards/google.guard';
import { ThirdPartyAuthDto } from './dto/third-party-auth.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    /** POST - /api/studium/auth/login */
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
        const { email, password } = loginData;
        const token = await this.authService.logIn(email, password);
        this.setCookie(res, token);
    }

    /** POST - /api/studium/auth/register */
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

    /** GET - /api/studium/auth/validate */
    @Get('validate')
    public async validate(@Req() req: Request) {
        const token = req.signedCookies['authentication'];
        return await this.authService.validate(token || '');
    }

    /** GET - /api/studium/auth/google */
    @Get('google')
    @UseGuards(GoogleGuard)
    public async googleLogin() {}

    /** GET - /api/studium/auth/google */
    @Get('google/redirect')
    @UseGuards(GoogleGuard)
    @Redirect(process.env.FRONTEND_URL, 302)
    public async googleRedirect(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const user = req.user as any;
        const data = new ThirdPartyAuthDto();
        data.name = {
            firstName: user.name.givenName,
            lastName: user.name.familyName,
        };
        data.name.lastName = user.name.familyName;
        data.email = user.emails[0].value;
        data.provider = 'google';

        const token = await this.authService.thirdPartyAuthenticate(data);
        this.setCookie(res, token);
    }

    /**
     * HELPER: Sets a response cookie
     * @param res Response forwared from the controller
     * @param token Token provided
     */
    private setCookie(res: Response, token: string) {
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
}
