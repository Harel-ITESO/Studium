import { Component } from '@angular/core';
import { FormInputComponent } from '../../../shared/components/form-input/form-input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';
import { socialAccessOptions } from './models/social-access';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        FormInputComponent,
        ButtonComponent,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly router: Router
    ) {}

    // state
    public isLoading = false;
    public socialLoginOptions = [...socialAccessOptions];

    // errors
    public error = false;
    public errorMessage = '';

    // form
    public formGroup = new FormGroup({
        email: new FormControl(''),
        password: new FormControl(''),
    });

    /**
     * Handles the submit of the form
     */
    public async handleFormSubmit() {
        try {
            this.isLoading = true;
            this.error = false;
            const email = this.formGroup.get('email')?.value || '';
            const password = this.formGroup.get('password')?.value || '';
            this.formGroup.disable();
            await this.authenticationService.loginUser(email, password);
            this.router.navigate(['/platform']);
        } catch (e) {
            console.log(e);
            this.error = true;
            if (e instanceof HttpErrorResponse) {
                if (e.status === 401 || e.status === 404 || e.status === 400)
                    this.errorMessage = 'Invalid email or password';
                else this.errorMessage = 'Error, please try again later';
            }
        }
        this.formGroup.enable();
        this.isLoading = false;
    }
}
