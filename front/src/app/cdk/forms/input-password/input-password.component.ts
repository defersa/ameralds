import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AmstoreFormsBaseDirective } from '../forms.abstract.directive';
import { IconsName } from "@am/cdk/icons/icons.service";

@Component({
    selector: 'amstore-forms-input-password',
    templateUrl: './input-password.component.html',
    styleUrls: ['./input-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmstoreInputPasswordComponent extends AmstoreFormsBaseDirective {
    public type: 'text' | 'password' = 'password';

    @Input()
    public name: string = '';


    constructor(public elementRef: ElementRef) {
        super(elementRef)
    }

    public switchType(): void {
        this.type = this.type === 'password' ? 'text' : 'password';
    }
}
