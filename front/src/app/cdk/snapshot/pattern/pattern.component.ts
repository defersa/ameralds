import { expandAnimation } from '@am/cdk/animations/expand';
import { ThemePalette } from '@am/cdk/core/color';
import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
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
import { AmstoreSnapshotBaseDirective } from '../snapshot.base.directive';


type ButtonStatusMap = {
    label: string;
    action: () => void;
    color: ThemePalette;
}


@Component({
    selector: 'amstore-snapshot-pattern',
    templateUrl: './pattern.component.html',
    styleUrls: ['./pattern.component.scss'],
    animations: [
        expandAnimation
    ],
})
export class AmstoreSnapshotPatternComponent extends AmstoreSnapshotBaseDirective implements OnDestroy, OnInit {
    public get images(): ImageModelSmall[] {
        return this.data.images;
    };

    public get title(): string {
        return this.data.name;
    };

    public get categories(): IdName[] {
        return this.data.categories || [{id: 0, name: 'Паттернчик'}, {id: 0, name: 'Цветочек'}]
    }

    public get sizes(): IdName[] {
        return this.data.sizes || [{id: 0, name: '49.5'}]
    }

    @Input()
    public data: SmallPattern = MOCK_PATTERN;

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
        private profileService: ProfileService,
        private langService: LangService,
        private goodsService: GoodsService) {
        super(elementRef)

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
