import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthenticationService,
        private readonly router: Router
    ) {}
    public async canActivate() {
        const { valid } = await this.authService.validate();
        if (!valid) this.router.navigate(['/authentication/login']);
        return valid;
    }
}
