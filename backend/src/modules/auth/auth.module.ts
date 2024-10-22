import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
    imports: [UsersModule],
    controllers: [AuthController],
    providers: [AuthService, JwtService, GoogleStrategy],
})
export class AuthModule {}
