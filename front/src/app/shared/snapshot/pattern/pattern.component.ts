import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { expandAnimation } from '@am/cdk/animations/expand';
import { LangType } from '@am/interface/lang.interface';
import { GoodsCard, ProductLite } from '@am/interface/goods.intreface';
import { ImageModelSmall } from '@am/interface/image.interface';
import { IPattern, PattenSizeFiles } from '@am/interface/pattern.interface';
import { IdName } from '@am/interface/request.interface';
import { GoodsService } from '@am/services/goods.service';
import { LangService } from '@am/services/lang.service';
import { ProfileService } from '@am/services/profile.service';
import { MONEY_UNIT } from "@am/utils/constants";

import { AmstoreSnapshotBaseDirective } from '../snapshot.base.directive';
import { CategoryType } from "@am/interface/category.interface";


@Component({
    selector: 'amstore-snapshot-pattern',
    templateUrl: './pattern.component.html',
    styleUrls: ['./pattern.component.scss', '../snapshot.mobile.scss'],
    animations: [
        expandAnimation
    ],
})
export class AmstoreSnapshotPatternComponent extends AmstoreSnapshotBaseDirective implements OnDestroy, OnInit {
    @Input()
    public data: IPattern;

    public status: 'buy' | 'remove' | 'bought' = 'buy';
    public showSale: boolean = false;


    protected destroyed: Subject<void> = new Subject<void>();

    private _lang: LangType = 'ru';

    constructor(protected injector: Injector,
                private profileService: ProfileService,
                private langService: LangService,
                private goodsService: GoodsService) {
        super(injector);

    }

    public get images(): ImageModelSmall[] {
        return this.data.images;
    };

    public get title(): string {
        return this.data.name[this._lang];
    };

    public get categories(): IdName[] {
        return this.data.category?.map((item: CategoryType) => ({ id: item.id, name: item.name[this._lang] }));
    }

    public get sizes(): PattenSizeFiles[] {
        return this.data?.sizes || [];
    }

    public get price(): string {
        return this.data.price[this._lang] + MONEY_UNIT[this._lang];
    }

    public get expandState(): 'collapsed' | 'expanded' {
        return this.showSale ? 'expanded' : 'collapsed';
    }

    public ngOnInit(): void {
        this.langService.lang$.pipe(takeUntil(this.destroyed))
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
