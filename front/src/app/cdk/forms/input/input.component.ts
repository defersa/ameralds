import { Component, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AmstoreFormsBaseDirective } from '../forms.abstract.directive';

@Component({
    selector: 'amstore-forms-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss']
})
export class AmstoreInputComponent extends AmstoreFormsBaseDirective {
    @Input()
    public get type(): string {
        return this._type;
    }
    public set type(value: string) {
        this._type = value;
    }
    private _type: string = 'text';

    @Input()
    public name: string = '';

    constructor(public elementRef: ElementRef) {
        super(elementRef)
    }
}
