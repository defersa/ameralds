import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { map, mergeMap, switchMap, takeUntil } from "rxjs/operators";

import { SizesService } from "@am/shared/services/sizes.service";
import { CategoriesService } from "@am/shared/services/categories.service";
import { LangService } from "@am/services/lang.service";
import { OptionType } from "@am/interface/cdk.interface";
import { LangType } from "@am/interface/lang.interface";
import { CategoryType } from "@am/interface/category.interface";
import { SIZE_UNIT } from "@am/utils/constants";
import { AmstoreDestroyService } from "@am/utils/destroy.service";

@Component({
    selector: 'amstore-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    providers: [AmstoreDestroyService],
    host: {
        class: 'amstore-filter'
    }
})
export class AmstoreFilterComponent implements OnInit {

    public lang$: BehaviorSubject<LangType> = this._langService.lang;
    public sizeUnit$: Observable<string> = this.lang$.pipe(map((lang: LangType) => SIZE_UNIT[lang]));
    public categoriesList$: Observable<OptionType[]> = this._categoriesList();
    public sizesList$: Observable<OptionType[]> = this._getSizeList();

    public filterForm: UntypedFormGroup = AmstoreFilterComponent._getFilterModel();

    @Input()
    public set filters(value: Record<string, unknown>) {
        Object.keys(value).forEach((key: string) => {
            this.filterForm.get(key)?.setValue(value[key]);
        });
        this.isChanged = false;
        this._filters = value;
        this.isEmpty = !Boolean(Object.values(value).filter((value: unknown) => (value as string)?.length).length);
    }

    private _filters: Record<string, unknown> = {};

    public isChanged: boolean = false;
    public isEmpty: boolean = false;

    @Output()
    public onSetFilters: EventEmitter<Record<string, unknown>> = new EventEmitter<Record<string, unknown>>();

    constructor(
        private _langService: LangService,
        private _sizeService: SizesService,
        private _categoriesService: CategoriesService,
        private _destroyed: AmstoreDestroyService
    ) {
    }

    public ngOnInit(): void {
        this.filterForm.valueChanges
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this.isChanged = true);
    }

    public setFilters(): void {
        const values: Record<string, unknown> = Object.entries(this.filterForm.getRawValue())
            .filter(([key, value]: [string, unknown]) => (value as string)?.length)
            .reduce((acc: Record<string, unknown>, [key, value]: [string, unknown]) => ({...acc, [key]: value}), {});

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


    private static _getFilterModel(): UntypedFormGroup {
        return new UntypedFormGroup({
            search: new UntypedFormControl(),
            categories: new UntypedFormControl(),
            sizes: new UntypedFormControl()
        });
    }

    private _categoriesList(): Observable<OptionType[]> {
        return this._categoriesService.getCategoriesAll()
            .pipe(
                mergeMap((items: CategoryType[]) =>
                    this.lang$.pipe(
                        map((lang: LangType) => items.map((item: CategoryType) =>
                            ({
                                value: item.id,
                                label: item.name[lang]
                            })
                        )))
                ));
    }

    private _getSizeList(): Observable<OptionType[]> {
        return this._sizeService.getSizesAll()
            .pipe(
                switchMap((items: OptionType[]) =>
                    this.sizeUnit$.pipe(
                        map((unit: string) => items.map((item: OptionType) => ({
                            label: item.label + ' ' + unit,
                            value: item.value
                        })))
                    )
                )
            );
    }

}
