import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
    selector: 'app-auth-layout',
    standalone: true,
    imports: [RouterModule, CommonModule],
    templateUrl: './auth-layout.component.html',
    styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent implements OnInit {
    public hidden = true;
    public className = `auth-box rounded-xl ${this.hidden ? 'hidden' : ''}`;

    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly router: Router
    ) {}

    public async ngOnInit() {
        const { valid } = await this.authenticationService.validate();
        if (valid) {
            this.router.navigate(['/platform']);
        } else {
            setTimeout(() => {
                this.hidden = false;
            }, 200);
        }
    }
}
