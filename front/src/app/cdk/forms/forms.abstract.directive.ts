import { ChangeDetectorRef, Component, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { AbstractControl, UntypedFormControl, Validators } from '@angular/forms';
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
                this.changeDetector.markForCheck();
            });

        if(this.required) {
            this._control.addValidators([Validators.required])
        }

    };

    protected _control: AbstractControl = new UntypedFormControl();
    private _controlSubscription: Subscription | null = null;

    public get formControl(): UntypedFormControl {
        return this.control as UntypedFormControl;
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

    constructor(public elementRef: ElementRef, protected changeDetector: ChangeDetectorRef) {
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
