import { Component, Input, OnInit } from '@angular/core';
import { IdName } from "@am/interface/request.interface";
import { CategoryType } from "@am/interface/category.interface";
import { UntypedFormControl } from "@angular/forms";
import { PattenSizeFiles, PatternMaxType } from "@am/interface/pattern.interface";
import { LangType } from "@am/interface/lang.interface";
import { SIZE_UNIT } from "@am/utils/constants";
import { expandAnimation } from "@am/cdk/animations/expand";
import { GoodsCard, GoodsModifire, ProductType } from "@am/interface/goods.intreface";
import { ThemePalette } from "@am/cdk/core/color";
import { GoodsService } from "@am/services/goods.service";
import { combineLatest, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ProfileService } from "@am/services/profile.service";
import { EMPTY_PATTERN } from "@am/shared/mocks/pattern";

type ButtonStatusMap = {
    label: string;
    action: () => void;
    color: ThemePalette;
}


@Component({
    selector: 'app-pattern-cart',
    templateUrl: './pattern-cart.component.html',
    styleUrls: ['./pattern-cart.component.scss'],
    animations: [
        expandAnimation
    ],
})
export class PatternCartComponent implements OnInit {
    public get sizeUnit(): string {
        return SIZE_UNIT[this._lang];
    }

    public get title(): string {
        return this.data.name[this._lang];
    };

    public get categories(): IdName[] {
        return this.data.category.map((item: CategoryType) => ({id: item.id, name: item.name[this._lang]}))
    }

    public get price(): string {
        return this.data.price[this._lang] + (this._lang === 'en' ? '$' : '₽');
    }

    public get expandState(): 'collapsed' | 'expanded' {
        return this.showSale ? 'expanded' : 'collapsed';
    }

    public showSale: boolean = false;

    public sizesWithControl: { value: number; control: UntypedFormControl; id: number; }[] = [];

    @Input()
    public set data(value: PatternMaxType) {
        this.sizesWithControl = value.sizes.map((item: PattenSizeFiles) => ({
            value: item.size.value,
            control: new UntypedFormControl(),
            id: item.id
        }));
        this._data = value;
    };

    public get data(): PatternMaxType {
        return this._data;
    };

    private _data: PatternMaxType = EMPTY_PATTERN;

    public status: 'buy' | 'remove' | 'bought' = 'buy';

    private _lang: LangType = 'ru';
    protected destroyed: Subject<void> = new Subject<void>();

    constructor(private goodsService: GoodsService,
                private profileService: ProfileService,) { }

    public ngOnInit(): void {
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
}
