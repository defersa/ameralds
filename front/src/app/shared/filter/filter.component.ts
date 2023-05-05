import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { takeUntil } from "rxjs/operators";

import { SizesService } from "@am/shared/services/sizes.service";
import { CategoriesService } from "@am/shared/services/categories.service";
import { LangService } from "@am/services/lang.service";
import { OptionType } from "@am/interface/cdk.interface";
import { DestroySubject } from "@am/utils/destroy.service";
import { ThemePalette } from "@am/cdk/core/color";


@Component({
    selector: 'amstore-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    providers: [DestroySubject],
    host: {
        class: 'amstore-filter'
    }
})
export class AmstoreFilterComponent implements OnInit {

    public categoriesList$: Observable<OptionType[]> = this._categoriesService.categoriesList$;
    public sizesList$: Observable<OptionType[]> = this._sizeService.sizesList$;

    public filterForm: FormGroup = new FormGroup({
            search: new FormControl(),
            categories: new FormControl(),
            sizes: new FormControl()
        });

    @Input()
    public color?: ThemePalette = 'primary';

    @Input()
    public set filters(filters: Record<string, unknown>) {
        Object.entries(filters).forEach(([key, value]: [string, unknown]) => {
            this.filterForm.get(key)?.setValue(value);
        });

        this._filters = filters;

        this.checkIsEmpty();
    }

    private _filters: Record<string, unknown> = {};

    public isChanged: boolean = false;
    public isEmpty: boolean = false;
    protected onDestroy: DestroySubject = inject(DestroySubject);

    @Output()
    public onSetFilters: EventEmitter<Record<string, unknown>> = new EventEmitter<Record<string, unknown>>();

    constructor(
        private _langService: LangService,
        private _sizeService: SizesService,
        private _categoriesService: CategoriesService,
    ) {
    }

    public ngOnInit(): void {
        this.filterForm.valueChanges
            .pipe(takeUntil(this.onDestroy))
            .subscribe(() => this.isChanged = true);
    }

    public setFilters(): void {
        const values: Record<string, unknown> = this.filterForm.getRawValue();
        this._filters = values;

        this.checkIsEmpty();

        this.onSetFilters.emit(values);
    }

    public resetFilters(): void {
        this.filters = this._filters;
    }

    public clearFilters(event: MouseEvent): void {
        event.stopPropagation();

        Object.values(this.filterForm.controls).forEach((item: AbstractControl) => item.setValue(null));
        this.setFilters();
    }

    private checkIsEmpty(): void {
        this.isChanged = false;
        this.isEmpty = !Boolean(Object.values(this._filters).filter((value: unknown) => (value as string)?.length).length);
    }
}


