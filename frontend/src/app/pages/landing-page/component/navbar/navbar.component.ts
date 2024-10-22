import { Component } from '@angular/core';
import { FormInputComponent } from '../../../../components/form-input/form-input.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormInputComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
