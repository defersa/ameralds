import { HttpClient } from '@angular/common/http';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { combineLatest, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AmstoreViewerService } from '@am/shared/viewer/viewer.service';

import { CategoryType } from '@am/interface/category.interface';
import { OptionType } from '@am/interface/cdk.interface';
import { ImageModelSmall } from '@am/interface/image.interface';
import { PattenSizeFiles, PatternMaxType, PatternSaveResultResponse } from '@am/interface/pattern.interface';
import { LangType } from '@am/interface/lang.interface';
import { ArrayComponent } from '@am/cdk/forms/array/array.component';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { SizesService } from '@am/shared/services/sizes.service';
import { SizeType } from '@am/interface/size.interface';
import { ArratValidatorFns } from '@am/cdk/forms/array/array-validators-fn';
import { CategoriesService } from '@am/shared/services/categories.service';
import { PatternService } from '@am/shared/services/pattern.service';


import { AmstoreCardDirective } from '../card.directive';


@Component({
    selector: 'amstore-pattern-add-card',
    templateUrl: './pattern-add.component.html',
    styleUrls: ['./pattern-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmstorePatternAddCardComponent extends AmstoreCardDirective implements OnDestroy, OnInit {
    public get mainImage(): ImageModelSmall | null {
        return this._images[0] || null;
    }

    public get subImages(): ImageModelSmall[] {
        return this._images.length ? this._images.slice(1) : [];
    }

    public get images(): ImageModelSmall[] {
        return this._images.length ? this._images : [];
    }

    public _images: ImageModelSmall[] = [];

    public $categoryList: Observable<OptionType[]> | undefined;

    @Input()
    public set data(value: PatternMaxType) {
        this._images = value.images;
        this._data = value;

        this._fillPatternForm(value);
    };

    private _data: PatternMaxType | null = null;

    public patternForm: FormGroup;

    public sizeArrayControl: FormArray = new FormArray([]);
    public sizeArrayComponentList: ArrayComponent[] = [];
    public sizeArrayModel: Record<string, unknown>[] = [];

    private _lang: LangType = 'ru';

    protected destroyed: Subject<void> = new Subject<void>();

    constructor(public elementRef: ElementRef,
                private _changeDetector: ChangeDetectorRef,
                private _sizeService: SizesService,
                private _categoriesService: CategoriesService,
                private _patternService: PatternService,
                private httpClient: HttpClient,
                private _arrayValidatorsFns: ArratValidatorFns,
                private _snackBar: MatSnackBar,
                protected viewer: AmstoreViewerService) {
        super(viewer);

        this.patternForm = new FormGroup({
            name: new FormGroup({
                en: new FormControl(null, [Validators.required]),
                ru: new FormControl(null, [Validators.required]),
            }),
            price: new FormGroup({
                en: new FormControl(null, [Validators.required]),
                ru: new FormControl(null, [Validators.required]),
            }),
            hidden: new FormControl(null, [Validators.required]),
            category: new FormControl(null, [Validators.required])
        });
    }

    public ngOnInit(): void {
        this.$categoryList = this._categoriesService.getCategoriesAll();

        this.initSizes();
    }

    public getLangControl(groupName: string, controlName: string): FormControl {
        return (this.patternForm.get(groupName) as FormGroup).get(controlName) as FormControl;
    }

    private _fillPatternForm(value: PatternMaxType): void {
        this.patternForm.setValue({
            price: value.price,
            name: value.name,
            hidden: value.hidden,
            category: value.category.map((item: CategoryType) => item.id)
        });
        this.sizeArrayModel = value.sizes.map((item: Record<string, unknown>) => ({
            ...item,
            size: (item.size as Record<string, number>).id
        }));
    }

    public initSizes(): void {
        this._sizeService.getAllSizes()
            .subscribe((result: { items: SizeType[] }) => {
                this.sizeArrayComponentList = [
                    {
                        name: 'id',
                        label: 'ID',
                        component: 'label',
                        classes: 'col-12'
                    },
                    {
                        name: 'size',
                        component: 'select',
                        label: 'Размер',
                        items: result.items.map((item: SizeType) => ({ label: String(item.value), value: item.id })),
                        classes: 'col-12',
                        validator: [Validators.required, this._arrayValidatorsFns.getNotUniqValue('size')]
                    },
                    {
                        name: 'cbb',
                        label: '.cbb',
                        component: 'file',
                        classes: 'col-12',
                        validator: [Validators.required]
                    },
                    {
                        name: 'png',
                        label: '.png',
                        component: 'file',
                        classes: 'col-12',
                        validator: [Validators.required]
                    },
                    {
                        name: 'pdf',
                        label: '.pdf',
                        component: 'file',
                        classes: 'col-12',
                        validator: [Validators.required]
                    },
                    {
                        name: 'jbb',
                        label: '.jbb',
                        component: 'file',
                        classes: 'col-12',
                        validator: [Validators.required]
                    }
                ];
                this._changeDetector.markForCheck();
            });
    }

    public ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

    public openImagesEdit(): void {
        this.viewer.openEdit(this.images)
            .subscribe((images: false | ImageModelSmall[]) => {
                if (!images) {
                    return;
                }
                this._images = images;
                this._changeDetector.markForCheck();
            });
    }

    public save(): void {
        const isSizeArrayInvalid: boolean = this.sizeArrayControl.controls.reduce((acc: boolean, item: AbstractControl) => acc || item.invalid, false);
        if (isSizeArrayInvalid || this.patternForm.invalid) {
            this.sizeArrayControl.markAllAsTouched();
            this.patternForm.markAllAsTouched();

            this._snackBar.open('Не все поля заполнены корректно', undefined, { duration: 5000 });
            return;
        }

        let id = this._data ? this._data.id : null;
        const value: Record<string, unknown> = {
            id,
            patternSizes: this.sizeArrayControl.getRawValue(),
            images: this.images.map((item: ImageModelSmall) => item.id),
            ...this.patternForm.getRawValue(),
        };


        (id ? this._patternService.updatePattern(value) : this._patternService.createPattern(value))
            .pipe(switchMap((result: PatternSaveResultResponse) => {
                return combineLatest(result.sizes.map((item: { id: number; size: { id: number; }; }) => {
                        id = result.id;
                        const sizes: PattenSizeFiles = (value.patternSizes as Record<string, unknown>[])
                            .find((size: Record<string, unknown>) => size.size === item.size.id) as PattenSizeFiles;

                        const fileList: FormData = new FormData();
                        fileList.append('patternSizeId', String(item.id));

                        if (sizes.cbb instanceof Blob) {
                            fileList.append('cbb', sizes.cbb);
                        }
                        if (sizes.jbb instanceof Blob) {
                            fileList.append('jbb', sizes.jbb);
                        }
                        if (sizes.png instanceof Blob) {
                            fileList.append('png', sizes.png);
                        }
                        if (sizes.pdf instanceof Blob) {
                            fileList.append('pdf', sizes.pdf);
                        }

                        return this._patternService.setPatternFiles(fileList);
                    })
                )
            }))
            .subscribe(() => {
                this._snackBar.open('Все сохранено.', undefined, { duration: 5000 });

                if (id) {
                    this._patternService.goToEdit(id).then(() => window.location.reload());
                }
            })
    }
}
