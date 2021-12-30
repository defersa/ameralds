import { Directive, ElementRef, HostBinding } from '@angular/core';
import { AmstoreColor, ThemePalette } from '../core/color';

@Directive({ selector: 'button-base'})
export class AmstoreButtonBaseDirective extends AmstoreColor {
    @HostBinding('class')
    protected classes: string = 'amstore-button-base';

    protected defaultColor: ThemePalette = 'primary';

    constructor(public elementRef: ElementRef) {
        super(elementRef)
    }

}
