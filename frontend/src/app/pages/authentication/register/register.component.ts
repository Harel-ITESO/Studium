import { Component } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { FormInputComponent } from '../../../shared/components/form-input/form-input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Router, RouterModule } from '@angular/router';
import { socialAccessOptions } from '../login/models/social-access';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    standalone: true,
    templateUrl: './register.component.html',
    imports: [
        ReactiveFormsModule,
        FormsModule,
        FormInputComponent,
        ButtonComponent,
        RouterModule,
    ],
    styleUrl: './register.component.scss',
})
export class RegisterComponent {
    constructor(
        private readonly authenticationServie: AuthenticationService,
        private readonly router: Router
    ) {}
    public error = false;
    public errorMessage = '';

    public registerForm = new FormGroup({
        firstName: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        password: new FormControl(''),
        doubleCheckPassword: new FormControl(''),
    });

    public socialRegisterOptions = [...socialAccessOptions];

    public async handleSubmit() {
        try {
            this.error = false;
            this.errorMessage = '';
            const data = {
                firstName: this.registerForm.get('firstName')?.value || '',
                lastName: this.registerForm.get('lastName')?.value || '',
                email: this.registerForm.get('email')?.value || '',
                password: this.registerForm.get('password')?.value || '',
                doubleCheckPassword:
                    this.registerForm.get('doubleCheckPassword')?.value || '',
            };
            const createdMessage = await this.authenticationServie.registerUser(
                data
            );
            if (createdMessage.succesfull)
                this.router.navigate(['/authentication/login']);
        } catch (e) {
            this.error = true;
            // specify error if if possible
            if (e instanceof HttpErrorResponse) {
                const includeValue: Record<string, string> = {
                    'Unique constraint failed': 'Email is already in use',
                    'Passwords do not match': 'Passwords do not match',
                };
                for (const key in includeValue as Record<string, string>) {
                    if (e.error.message.includes(key)) {
                        this.errorMessage = includeValue[key];
                        break;
                    }
                }

                console.error(e.error);
            } else {
                this.errorMessage = 'An error occurred, please try again';
                console.error(e);
            }
        }
    }
}
