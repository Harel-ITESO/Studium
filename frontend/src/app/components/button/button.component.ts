import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ColorRole, Rounded } from '../../../../types/style-types';

/** Internal types */
type ButtonType = 'button' | 'menu' | 'reset' | 'submit';
type Variant = 'outlined' | 'filled';

@Component({
    selector: 'app-button',
    standalone: true,
    imports: [],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {
    /** Props */
    @Input() role: ColorRole = 'primary';
    @Input() type: ButtonType = 'button';
    @Input() variant: Variant = 'filled';
    @Input() rounded: Rounded = 'xl';
    @Input() iconLeft = '';
    @Input() iconRight = '';

    /** State */
    public className = '';

    /** Events */
    // eslint-disable-next-line @angular-eslint/no-output-native
    @Output() click = new EventEmitter<void>();

    /** Lifecycle */
    ngOnInit() {
        this.className = `${this.role} ${this.variant} rounded-${this.rounded}`;
    }

    public handleButtonClick() {
        this.click.emit();
    }
}
