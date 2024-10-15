import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

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

    ngOnInit() {
        setTimeout(() => {
            this.hidden = false;
        }, 200);
    }
}
