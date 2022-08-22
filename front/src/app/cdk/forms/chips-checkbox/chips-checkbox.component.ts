import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { AmstoreFormsBaseDirective, SelectOption } from "@am/cdk/forms/forms.abstract.directive";
import { startWith, takeUntil } from "rxjs/operators";
import { AmstoreDestroyService } from "@am/utils/destroy.service";

@Component({
    selector: 'amstore-chips-checkbox',
    templateUrl: './chips-checkbox.component.html',
    styleUrls: ['./chips-checkbox.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AmstoreDestroyService],
    host: {
        class: 'amstore-chips-checkbox'
    }
})
export class AmstoreChipsCheckboxComponent extends AmstoreFormsBaseDirective implements OnInit {
    @Input()
    public items: SelectOption[] | null | undefined = [];

    public values: number[] = [];

    constructor(public elementRef: ElementRef,
                private _destroyed: AmstoreDestroyService,
                private _changeDetectorRef: ChangeDetectorRef) {
        super(elementRef, _changeDetectorRef);
    }

    public ngOnInit(): void {
        this.control.valueChanges
            .pipe(
                takeUntil(this._destroyed),
                startWith(this.control.value))
            .subscribe((item: number[]) => {
                this.values = item ?? [];
                this._changeDetectorRef.markForCheck();
            });
    }

    public getState(value: number | string | null): 'selected' | 'none' {
        return this.values.includes(value as number) ? 'selected' : 'none';
    }

    public change(state: 'selected' | 'none', value: number | string | null): void {
        this.control.markAsTouched();
        this.control.setValue(state === 'selected' ? this.values.filter((item: number) => value !== item) : [...this.values, value]);
    }
}
