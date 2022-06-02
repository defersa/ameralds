import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { expandAnimation } from '@am/cdk/animations/expand';
import { ThemePalette } from '@am/cdk/core/color';
import { AmstoreViewerService } from '@am/shared/viewer/viewer.service';

import { GoodsService } from '@am/services/goods.service';
import { LangService } from '@am/services/lang.service';
import { ProfileService } from '@am/services/profile.service';


import { GoodsCard, GoodsModifire, ProductType } from '@am/interface/goods.intreface';
import { ImageModelSmall } from '@am/interface/image.interface';
import { PattenSizeFiles, PatternMaxType } from '@am/interface/pattern.interface';
import { IdName } from '@am/interface/request.interface';
import { LangType } from '@am/interface/lang.interface';

import { AmstoreCardDirective } from '../card.directive';
import { CategoryType } from '@am/interface/category.interface';
import { SIZE_UNIT } from "@am/utils/constants";
import { AccessEnum } from "@am/utils/router-builder";
import { SizeType } from "@am/interface/size.interface";
import { PatternService } from "@am/shared/services/pattern.service";
import { downloadBlobFile } from "@am/utils/file-utils";


type ButtonStatusMap = {
    label: string;
    action: () => void;
    color: ThemePalette;
}


@Component({
    selector: 'amstore-pattern-card',
    templateUrl: './pattern.component.html',
    styleUrls: ['./pattern.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        expandAnimation
    ],
})
export class AmstorePatternCardComponent extends AmstoreCardDirective {
    public get sizeUnit(): string {
        return SIZE_UNIT[this._lang];
    }

    public get images(): ImageModelSmall[] {
        return this.data.images.length ? this.data.images : [];
    }

    public get title(): string {
        return this.data.name[this._lang];
    };

    public get categories(): IdName[] {
        return this.data.category.map((item: CategoryType) => ({id: item.id, name: item.name[this._lang]}))
    }

    public sizesWithControl: { value: number; control: FormControl; id: number; }[] = [];

    @Input()
    public set data(value: PatternMaxType) {
        this.sizesWithControl = value.sizes.map((item: PattenSizeFiles) => ({
            value: item.size.value,
            control: new FormControl(),
            id: item.id
        }));
        this._data = value;
    };

    public get data(): PatternMaxType {
        return this._data;
    };

    private _data: PatternMaxType = MOCK_PATTERN;

    public status: 'buy' | 'remove' | 'bought' = 'buy';

    public profileStatus: BehaviorSubject<AccessEnum> = this.profileService.authAndModerStatus$;

    public showSale: boolean = false;

    public get expandState(): 'collapsed' | 'expanded' {
        return this.showSale ? 'expanded' : 'collapsed';
    }

    public get price(): string {
        return this.data.price[this._lang] + (this._lang === 'en' ? '$' : '₽');
    }


    private _lang: LangType = 'ru';

    public buttonStatus: Record<string, ButtonStatusMap> = {
        buy: {
            label: 'Купить',
            action: () => {
                this.goodsService.addProduct(
                    ProductType.Patterns, this.data)
                    .subscribe((result: GoodsModifire) => {
                    });
            },
            color: 'primary'
        },
        remove: {
            label: 'Удалить из корзины',
            action: () => {
                this.goodsService.removeProduct(
                    ProductType.Patterns, this.data.id)
                    .subscribe((result: GoodsModifire) => {
                    });
            },
            color: 'warn'
        },
        bought: {
            label: 'Товар уже куплен',
            action: () => {
            },
            color: 'accent'
        }
    }

    protected destroyed: Subject<void> = new Subject<void>();

    constructor(public elementRef: ElementRef,
                protected viewer: AmstoreViewerService,
                private changeDetector: ChangeDetectorRef,
                private profileService: ProfileService,
                private patternService: PatternService,
                private langService: LangService,
                private goodsService: GoodsService) {
        super(viewer);

    }

    public ngOnInit(): void {

        this.langService.lang.pipe(takeUntil(this.destroyed))
            .subscribe((lang: LangType) => {
                this._lang = lang;
                this.changeDetector.markForCheck();
            });

        combineLatest([
            this.goodsService.goods$,
            this.profileService.boughtPatterns$
        ]).pipe(takeUntil(this.destroyed))
            .subscribe(() => {
                this.status = 'buy';
                const goods: GoodsCard = this.goodsService.goods$.value;
                const bought: number[] = this.profileService.boughtPatterns$.value;
                if (goods.patterns.find((value: PatternMaxType) => value.id === this.data.id)) {
                    this.status = 'remove';
                }
                if (bought.find((value: number) => value === this.data.id)) {
                    this.status = 'bought';
                }
            })
    }

    public ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

    public downloadPattern(patternSizeId: number, format: 'pdf' | 'cbb' | 'png', sizeValue: number): void {
        this.patternService.downloadPatternBySize(patternSizeId, format)
            .subscribe((item: Blob) => {
                const name: string = this.title + '-' + sizeValue + (item.type === 'text/cbb' ? '.cbb' : '');
                downloadBlobFile(item, name);
            });
    }

    public downloadColor(): void {
        this.patternService.downloadColor(this.data.id)
            .subscribe((item: Blob) => {
                const name: string = this.title + '-colors.jpg';
                downloadBlobFile(item, name);
            });
    }
}

const MOCK_PATTERN: PatternMaxType = {
    id: 0,
    name: {ru: 'default', en: 'default'},
    price: {ru: 0, en: 0},
    description: '',
    colors: {id: 0},
    sizes: [],
    create_date: '',
    hidden: false,
    images: [],
    category: []
};
