import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [ButtonComponent, RouterLink, FooterComponent, HeaderComponent, NavbarComponent],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
