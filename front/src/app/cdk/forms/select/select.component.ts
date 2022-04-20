import { Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AmstoreFormsBaseDirective, SelectOption } from '../forms.abstract.directive';

@Component({
    selector: 'amstore-form-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'amstore-select'
    }
})
export class AmstoreSelectComponent extends AmstoreFormsBaseDirective {

    @Input()
    public multiple: boolean = false;

    @Input()
    public items: SelectOption[] | null | undefined = [];

    constructor(public elementRef: ElementRef) {
        super(elementRef)
    }

}
