import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class StudiumAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    public async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const token = request.signedCookies['authentication'];
        if (!token) throw new UnauthorizedException();
        try {
            const payload = (await this.jwtService.verifyAsync(token)) as User;
            request.user = payload;
        } catch (e) {
            console.error(e);
            throw new UnauthorizedException();
        }
        return true;
    }
}
