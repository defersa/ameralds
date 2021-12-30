import { Component, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AmstoreColor, ThemePalette } from '../core/color';

@Directive({ selector: 'forms-base'})
export class AmstoreFormsBaseDirective extends AmstoreColor {
    @HostBinding('class')
    protected classes: string = 'amstore-forms';

    @Input()
    public formControl: FormControl = new FormControl();

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
