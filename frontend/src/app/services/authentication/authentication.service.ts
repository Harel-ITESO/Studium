import { Injectable } from '@angular/core';
import { RestService } from '../rest/rest.service';
import { environment } from '../../../environments/environment.development';
import { UserRegister } from './models/register-user';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private readonly baseUrl = environment.apiUri + '/auth';

    constructor(private readonly restService: RestService) {}

    /**
     * Logins the user with his local credentials
     * @param email The email to send the request to
     * @param password The password of the user
     */
    public async loginUser(email: string, password: string) {
        await this.restService.post(this.baseUrl + '/login', {
            body: {
                loginData: {
                    email,
                    password,
                },
            },
        });
    }

    /**
     * Registers a user with the provided data
     * @param registerData The data to register the user with
     * @returns The success message
     */
    public async registerUser(registerData: UserRegister) {
        const message = await this.restService.post<{ succesfull: boolean }>(
            this.baseUrl + '/register',
            {
                body: {
                    registerData,
                },
            }
        );
        return message;
    }
}
