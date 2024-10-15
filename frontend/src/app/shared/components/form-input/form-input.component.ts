import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import { ColorRole, Rounded } from '../../../../../types/style-types';

type InputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

@Component({
    selector: 'app-form-input',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './form-input.component.html',
    styleUrl: './form-input.component.scss',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormInputComponent),
            multi: true,
        },
    ],
})
export class FormInputComponent implements OnInit, ControlValueAccessor {
    /** Props */

    // Input properties
    @Input() type: InputType = 'text';
    @Input() placeholder = '';
    @Input() id = '';
    @Input() name = '';
    @Input() maxLength? = 0;
    @Input() required = false;

    // Styling properties
    @Input() role: ColorRole = 'primary';
    @Input() rounded: Rounded = 'xl';
    @Input() iconLeft = '';
    @Input() iconRight = '';
    @Input() iconSubmitsForm = false;

    /** State */

    public value = '';
    public isDisabled = false;
    public length = 0;
    public className = '';
    private onChange: (value: string) => void = noop;
    private onTouch: () => void = noop;

    /** Methods */

    ngOnInit(): void {
        this.className = `${this.role} rounded-${this.rounded}`;
    }

    // The following bunch of shit is just for making ([ngModel]) available so don't ask
    public onInput(event: Event) {
        const input = event.target as HTMLInputElement;
        this.value = input.value;
        this.length = this.value.length;
        this.onChange(this.value);
    }

    public writeValue(value: string): void {
        this.value = value || '';
    }

    public registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouch = fn;
    }

    public setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }
}
