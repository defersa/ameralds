import { ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { AmstoreFormsBaseDirective } from '../forms.abstract.directive';

@Component({
    selector: 'amstore-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'amstore-checkbox'
    }
})
export class AmstoreCheckboxComponent extends AmstoreFormsBaseDirective {

    constructor(public elementRef: ElementRef) {
        super(elementRef);
    }
}
