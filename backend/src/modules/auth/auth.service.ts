import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/hash.util';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './model/jwt-payload';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    /**
     *  Logs in a user
     * @param email Email of the provided user
     * @param password Password sent
     * @returns JWT authentication token
     */
    public async logIn(email: string, password: string) {
        const user = await this.usersService.getUserWhere({ email });
        if (!user) throw new Error('Password not matching');
        const isPassword = await comparePasswords(password, user.password);
        if (!isPassword) throw new Error('Password not matching');
        const payload = new JwtPayload(user);

        const token = await this.jwtService.signAsync(
            { ...payload },
            {
                secret:
                    this.configService.get<string>('JWT_SECRET') || 'unsafe',
            },
        );
        return token;
    }

    /**
     *
     * @param userData Data for the user creation
     * @returns True if the user was created
     */
    public async register(userData: CreateUserDto) {
        await this.usersService.createUser(userData);
        return true;
    }
}