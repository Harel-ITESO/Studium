import {
    BadRequestException,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/hash.util';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './model/jwt-payload';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '@prisma/client';
import { ThirdPartyAuthDto } from './dto/third-party-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    /**
     * Generates a JWT token from the user information
     * @param user The user information
     * @returns A JWT token
     */
    private async generateTokenFromUserInformation(user: User) {
        const payload = JwtPayload.fromUser(user);
        const token = await this.jwtService.signAsync(
            { ...payload },
            {
                secret: this.configService.get<string>('JWT_SECRET'),
            },
        );
        return token;
    }

    /**
     *  Logs in a user
     * @param email Email of the provided user
     * @param password Password sent
     * @returns JWT authentication token
     */
    public async logIn(email: string, password: string) {
        const user = await this.usersService.getUserWhere({ email });
        if (!password) throw new BadRequestException('Password is required');
        if (!user) throw new NotFoundException('User was not found');
        const isPassword = await comparePasswords(
            password,
            user.password || '',
        );
        if (!isPassword)
            throw new UnauthorizedException(
                'Provided user cannot be authenticated',
            );
        const token = await this.generateTokenFromUserInformation(user);
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

    public async validate(token: string) {
        try {
            const payload = (await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET'),
            })) as JwtPayload;
            return {
                valid: true,
                userInformation: {
                    id: payload.id,
                    email: payload.email,
                },
            };
        } catch {
            return { valid: false, userInformation: null };
        }
    }

    /**
     * Authenticates a user from third party services.
     * Tries to find the user in the database, if it doesn't exist, it creates it.
     * @param authData The data for authentication
     * @returns The generated token
     */
    public async thirdPartyAuthenticate(authData: ThirdPartyAuthDto) {
        const { email } = authData;
        const userExists = await this.usersService.getUserWhere({ email });
        if (userExists)
            return await this.generateTokenFromUserInformation(userExists);
        const newUser = await this.usersService.createUser({
            email,
            firstName: authData.name.firstName,
            lastName: authData.name.lastName,
            provider: authData.provider,
        });
        return await this.generateTokenFromUserInformation(newUser);
    }
}
