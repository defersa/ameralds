import { expandAnimation } from '@am/cdk/animations/expand';
import { ThemePalette } from '@am/cdk/core/color';
import { AmstoreViewerService } from '@am/cdk/viewer/viewer.service';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LangType } from 'src/app/core/language/language.component';
import { GoodsCard, GoodsModifire, ProductLite, ProductType } from 'src/app/interface/goods.intreface';
import { ImageModelSmall } from 'src/app/interface/image.interface';
import { SmallPattern } from 'src/app/interface/pattern.interface';
import { IdName } from 'src/app/interface/request.interface';
import { GoodsService } from 'src/app/services/goods.service';
import { LangService } from 'src/app/services/lang.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AmstoreCardDirective } from '../card.directive';


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
    public get mainImage(): ImageModelSmall {
        return this.data.images[0] || { id: '', image_full: '', image_small: ''};
    }

    public get subImages(): ImageModelSmall[] {
        return this.data.images.length ? this.data.images.slice(1)  : [];
    }
    public get images(): ImageModelSmall[] {
        return this.data.images.length ? this.data.images : [];
    }


    public get title(): string {
        return this.data.name;
    };

    public get categories(): IdName[] {
        return this.data.categories || [{id: 0, name: 'Паттернчик'}, {id: 0, name: 'Цветочек'}]
    }

    public sizes: { entity: IdName, control: FormControl }[] = [];

    @Input()
    public set data(value: SmallPattern) {
        this.sizes = (value.sizes || [{id: 0, name: '49.5'}]).map((item: IdName) => ({ entity: item, control: new FormControl()}));
        this._data = value;
    };
    public get data(): SmallPattern {
        return this._data;
    };
    private _data: SmallPattern = MOCK_PATTERN;

    public status: 'buy' | 'remove' | 'bought' = 'buy';

    public showSale: boolean = false;
    public get expandState(): 'collapsed' | 'expanded' {
        return this.showSale ? 'expanded' : 'collapsed';
    }

    private _moneyUnit: '$' | '₽' = '₽';

    private _lang: LangType = 'ru';

    public get price(): string {
        return this._lang === 'en' ? this.data.price_en + '$' : this.data.price_ru + '₽';
    }


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
            action: () => { },
            color: 'accent'
        }
    }

    protected destroyed: Subject<void> = new Subject<void>();

    constructor(public elementRef: ElementRef,
        protected viewer: AmstoreViewerService,
        private profileService: ProfileService,
        private langService: LangService,
        private goodsService: GoodsService) {
        super(viewer);

    }

    public ngOnInit(): void {
        this.langService.lang.pipe(takeUntil(this.destroyed))
        .subscribe((lang: LangType) => this._lang = lang);

        combineLatest([
            this.goodsService.goods$,
            this.profileService.boughtPatterns$
        ]).pipe(takeUntil(this.destroyed))
            .subscribe(() => {
                this.status = 'buy';
                const goods: GoodsCard = this.goodsService.goods$.value;
                const bought: number[] = this.profileService.boughtPatterns$.value;
                if (goods.patterns.find((value: ProductLite) => value.id === this.data.id)) {
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
}

const MOCK_PATTERN: SmallPattern = {
    id: 0,
    name: '',
    description: '',
    urls: '',
    price_ru: 0,
    price_en: 0,
    create_date: undefined,
    images: []
};
