import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginLayoutComponent } from './layouts/login-layout/login-layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
    /** Landing Page */
    { path: '', component: LandingPageComponent },

    /** Login pages */
    { path: 'login', component: LoginLayoutComponent },

    /** Application pages */
    { path: 'platform', component: MainLayoutComponent },

    /** Redirect to home if route doesn't exist */
    { path: '*', redirectTo: '' },
];
