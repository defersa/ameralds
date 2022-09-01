import { Component, Input, OnDestroy } from '@angular/core';
import { PattenSizeFiles, PatternMaxType } from "@am/interface/pattern.interface";
import { FormGroup, UntypedFormControl } from "@angular/forms";
import { AdminService } from "@am/services/admin.service";
import { CartPattern } from "@am/interface/cart.interface";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { EMPTY_PATTERN } from "@am/shared/mocks/pattern";

type SizeWithControl = { value: number; control: UntypedFormControl; id: number; }

@Component({
    selector: 'amstore-pattern-admin',
    templateUrl: './pattern-admin.component.html',
    styleUrls: ['./pattern-admin.component.scss']
})
export class PatternAdminComponent implements OnDestroy {
    public formGroup: FormGroup = new FormGroup({});
    public sizesWithControl: SizeWithControl[] = [];
    public colorControl: UntypedFormControl = new UntypedFormControl(false);

    @Input()
    public set pattern(value: PatternMaxType) {
        this._pattern = value;
        this.setFormControl(value);
    }

    public get pattern(): PatternMaxType {
        return this._pattern || EMPTY_PATTERN;
    }

    private _pattern?: PatternMaxType;

    public inCart: boolean = false;
    public canAdd: boolean = false;

    public destroyOldPattern: Subject<void> = new Subject<void>();
    public destroyed: Subject<void> = new Subject<void>();

    constructor(
        private _admin: AdminService
    ) { }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

    public setFormControl(value: PatternMaxType): void {
        this.destroyOldPattern.next();
        this.destroyOldPattern.complete();

        this.destroyOldPattern = new Subject();

        this.sizesWithControl = value.sizes.map((item: PattenSizeFiles) => ({
            value: item.size.value,
            control: new UntypedFormControl(false),
            id: item.id
        }));
        this.colorControl = new UntypedFormControl(false);

        const sizesGroup: FormGroup = new FormGroup({});

        this.sizesWithControl.forEach((item: SizeWithControl) => {
            sizesGroup.addControl(String(item.id), item.control)
        });
        this.formGroup = new FormGroup({
            sizes: sizesGroup,
            colors: this.colorControl
        });

        this._admin.cart$
            .pipe(
                takeUntil(this.destroyOldPattern),
                takeUntil(this.destroyed))
            .subscribe((cart: CartPattern[]) => {
                const pattern: CartPattern | undefined = cart.find((item: CartPattern) => item.id === this.pattern.id);

                if (pattern) {
                    this.colorControl.setValue(pattern.colors);
                    this.sizesWithControl.forEach((item: SizeWithControl) => item.control.setValue(pattern.sizes.includes(item.id)));
                }

                this.inCart = Boolean(pattern);
                this.canAdd = false;

            });

        this.formGroup.valueChanges
            .pipe(
                takeUntil(this.destroyOldPattern),
                takeUntil(this.destroyed))
            .subscribe(() => {
                this.canAdd =
                    this.sizesWithControl.filter((item: SizeWithControl) => item.control.value).length ||
                    this.colorControl.value;
            });
    }

    public addToCart(): void {
        this._admin.addPatterToCart({
            id: this.pattern.id,
            price: {en: 0, ru: 0},
            colors: this.colorControl.value,
            sizes: this.sizesWithControl
                .filter((item: SizeWithControl) => item.control.value)
                .map((item: SizeWithControl) => item.id)
        })
    }

    public removeFromCart(): void {
        this._admin.removePatterToCart(this.pattern.id);

        this.colorControl.setValue(false);
        this.sizesWithControl.forEach((item: SizeWithControl) => item.control.setValue(false));
    }

}
