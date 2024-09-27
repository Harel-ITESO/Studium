import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [ButtonComponent],
    templateUrl: './landing-page.component.html',
    styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
    public counter = 0;

    public addToCount() {
        this.counter++;
    }

    public resetCount() {
        this.counter = 0;
    }
}
