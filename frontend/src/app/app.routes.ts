import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/authentication/login/login.component';
import { RegisterComponent } from './pages/authentication/register/register.component';

export const routes: Routes = [
    /** Landing Page */
    { path: '', component: LandingPageComponent },

    /** Login pages */
    {
        path: 'authentication',
        component: AuthLayoutComponent,
        children: [
            // Redirecto to /login as base in case the main route is accessed
            {
                path: '',
                redirectTo: 'login',
                pathMatch: 'prefix',
            },
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'register',
                component: RegisterComponent,
            },
        ],
    },

    /** Application pages */
    { path: 'platform', component: MainLayoutComponent },

    /** FOR STARTER TESTING */
    { path: 'test', component: TestPageComponent },

    /** Redirect to home if route doesn't exist */
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
