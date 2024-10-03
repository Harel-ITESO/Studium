import {
    Controller,
    Post,
    Body,
    UnauthorizedException,
    BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /** POST - /studium/api/auth/login */
    @Post('login')
    public async logIn(
        @Body('loginData')
        loginData: {
            email: string;
            password: string;
        },
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
        if (await this.authService.register(data)) return { succesfull: true };
    }
}
