import { ChangeDetectionStrategy, Component, ElementRef, Injector, Input } from '@angular/core';
import { AmstoreFormsBaseDirective } from '../forms.abstract.directive';

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


    public switchType(): void {
        this.type = this.type === 'password' ? 'text' : 'password';
    }
}
