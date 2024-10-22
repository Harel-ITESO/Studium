import { Component } from '@angular/core';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from './component/navbar/navbar.component';
import { Seccion1Component } from "./component/seccion1/seccion1.component";

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [ButtonComponent, RouterLink, FooterComponent, HeaderComponent, NavbarComponent, Seccion1Component],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
