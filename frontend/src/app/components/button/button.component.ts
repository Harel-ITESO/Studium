import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ColorRole } from '../../../../types/color-types';

/** Internal types */
type ButtonType = 'button' | 'menu' | 'reset' | 'submit';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})
export class ButtonComponent {
    /** Props */
    @Input() role: ColorRole = 'primary';
    @Input() type: ButtonType = 'button';

    /** Events */
    @Output() buttonClick = new EventEmitter<void>();

    public handleButtonClick() {
        this.buttonClick.emit();
    }
}
