import { Component, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Subject, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { AmstoreColor, ThemePalette } from '../core/color';
import { getControlErrors } from './error-message-builder';

export type SelectOption = {
    label: string;
    value: string | number | null;
}

@Directive({ selector: 'forms-base' })
export class AmstoreFormsBaseDirective extends AmstoreColor {
    @HostBinding('class')
    protected classes: string = 'amstore-forms';

    public get isErrorState(): boolean {
        return this.control.invalid && this.control.touched;
    }

    @Input()
    public required: boolean = false;

    @Input()
    public set nullControl(value: AbstractControl | null) {
        if(value) {
            this.control = value;
        }
    };

    @Input()
    public get control(): AbstractControl {
        return this._control;
    };

    public set control(value: AbstractControl) {
        if (this._controlSubscription) {
            this._controlSubscription.unsubscribe();
        }

        this._control = value;
        this._controlSubscription = this._control.statusChanges
            .pipe(startWith(""))
            .subscribe(() => {
                const errors: string | null = this.control.invalid ? getControlErrors(this.control.errors) : null;
                this.errors$.next(errors);
            });

    };

    protected _control: AbstractControl = new FormControl();
    private _controlSubscription: Subscription | null = null;

    public get formControl(): FormControl {
        return this.control as FormControl;
    }

    public errors$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    @Input()
    public get isContrast(): boolean {
        return this._isContrast;
    }
    public set isContrast(value: boolean) {
        this._isContrast = value;
        this.classes = 'amstore-forms' + (this._isContrast ? ' is-contrast' : '');
    }

    private _isContrast: boolean = false;

    protected defaultColor: ThemePalette = 'primary';

    constructor(public elementRef: ElementRef) {
        super(elementRef)
    }

}

@Component({
    selector: 'amstore-forms-label',
    template: '<ng-content></ng-content>'
})
export class AmstoreFormLabel {

    constructor() {
    }
}
