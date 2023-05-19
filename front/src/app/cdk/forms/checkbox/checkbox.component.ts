import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { AmstoreFormsBaseDirective } from '../forms.abstract.directive';
import { DestroySubject } from "@am/utils/destroy.service";

@Component({
    selector: 'amstore-checkbox',
    templateUrl: './checkbox.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroySubject],
    host: {
        class: 'amstore-checkbox'
    }
})
export class AmstoreCheckboxComponent extends AmstoreFormsBaseDirective {
}
