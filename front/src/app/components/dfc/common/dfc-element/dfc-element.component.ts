import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { getControlErrors } from '../error-message-builder';

@Directive({
    selector: 'dfc-element'
})
export class DfcElementDirective {

    public get isErrorState(): boolean {
        return this.control.invalid && this.control.touched;
    }

    @Input()
    public placeholder: string | null = null;

    @Input()
    public label: string | null = null;

    @Input()
    public get control(): FormControl {
        return this._control;
    };

    public set control(value: FormControl) {
        if (this._controlSubscription) {
            this._controlSubscription.unsubscribe();
        }

        this._controlSubscription = value.statusChanges.subscribe(() => {
            const errors: string | null = this.isErrorState ? getControlErrors(this.control.errors) : null;
            this.errors.next(errors);
        });

        this._control = value;
    };

    private _control: FormControl = new FormControl;

    private _controlSubscription: Subscription | null = null;

    public errors: Subject<string | null> = new Subject<string | null>();
    constructor() { }

}
