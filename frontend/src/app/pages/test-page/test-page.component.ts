import { Component } from '@angular/core';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { ButtonComponent } from '../../components/button/button.component';
import { FormsModule } from '@angular/forms';
import { RestService } from '../../services/rest/rest.service';
import { environment } from '../../../environments/environment.development';

interface UserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

@Component({
    selector: 'app-test-page',
    standalone: true,
    imports: [FormInputComponent, ButtonComponent, FormsModule],
    templateUrl: './test-page.component.html',
    styleUrl: './test-page.component.scss',
})
export class TestPageComponent {
    public foundUser?: UserModel;
    public idString = '';
    public errorMessage = '';

    constructor(private readonly restSerivce: RestService) {}

    public async handleTodoSubmit(event: Event) {
        try {
            event.preventDefault();
            this.errorMessage = '';
            const id = parseInt(this.idString);
            this.foundUser = await this.restSerivce.get<UserModel>(
                environment.apiUri + '/users' + '/' + id
            );
        } catch (e) {
            this.errorMessage = (e as Error).message;
        }
    }
}
