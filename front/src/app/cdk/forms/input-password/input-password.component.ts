import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AmstoreFormsBaseDirective } from '../forms.abstract.directive';
import { DestroySubject } from "@am/utils/destroy.service";

@Component({
    selector: 'amstore-forms-input-password',
    templateUrl: './input-password.component.html',
    styleUrls: ['./input-password.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroySubject],
})
export class AmstoreInputPasswordComponent extends AmstoreFormsBaseDirective {
    public type: 'text' | 'password' = 'password';


    public switchType(): void {
        this.type = this.type === 'password' ? 'text' : 'password';
    }
}
