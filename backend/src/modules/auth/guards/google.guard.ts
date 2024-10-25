import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleGuard extends AuthGuard('google') {
    constructor(private configService: ConfigService) {
        super({
            accessType: 'offline',
        });
    }
}
