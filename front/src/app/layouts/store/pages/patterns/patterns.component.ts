import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { FilterQuery } from 'src/app/components/paginated-page/paginated-page.component';
import { ProductType, GoodsModifire, GoodsCard, ProductLite } from 'src/app/interface/goods.intreface';
import { PageRequest, SmallPattern, SmallPatternWithStatus } from 'src/app/interface/pattern.interface';
import { GoodsService } from 'src/app/services/goods.service';
import { ProfileService } from 'src/app/services/profile.service';
import { PatternService } from '../../services/pattern.service';


@Component({
    selector: 'app-patterns',
    templateUrl: './patterns.component.html',
    styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent implements OnInit, OnDestroy {

    public rawItems: SmallPattern[] = [];
    public items: SmallPatternWithStatus[] = [];
    public pageCount: number = 1;
    public page: number = 1;

    public buttonStatus = {
        buy: {
            label: 'Купить',
            action: (pattern: SmallPattern) => {
                this.goodsService.addProduct(
                    ProductType.Patterns, pattern)
                    .subscribe((result: GoodsModifire) => {
                    });
            },
            class: 'amstore-pattern-button_common'
        },
        remove: {
            label: 'Удалить из корзины',
            action: (pattern: SmallPattern) => {
                this.goodsService.removeProduct(
                    ProductType.Patterns, pattern.id)
                    .subscribe((result: GoodsModifire) => {
                    });
            },
            class: 'amstore-pattern-button_in-goods'
        },
        bought: {
            label: 'Товар уже куплен',
            action: (pattern: SmallPattern) => { },
            class: 'amstore-pattern-button_bought'
        }
    }

    protected destroyed: Subject<void> = new Subject<void>();


    constructor(
        private pattern: PatternService,
        private profileService: ProfileService,
        private goodsService: GoodsService
    ) {
        this.goodsService.goods$.pipe(takeUntil(this.destroyed)).subscribe(this.getPatternsStatusUpdate());
        this.profileService.boughtPatterns$.pipe(takeUntil(this.destroyed)).subscribe(this.getPatternsStatusUpdate())
    }

    public getPatternsStatusUpdate(): () => void {
        return () => {
            this.items = this.rawItems.map((item: SmallPattern) => {
                let status: 'buy' | 'remove' | 'bought' = 'buy';
                const goods: GoodsCard = this.goodsService.goods$.value;
                const bought: number[] = this.profileService.boughtPatterns$.value;
                if (goods.patterns.find((value: ProductLite) => value.id === item.id)) {
                    status = 'remove';
                }
                if (bought.find((value: number) => value === item.id)) {
                    status = 'bought';
                }
                return {
                    ...item, status
                }
            });
        }
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }


    public nextPage(query: FilterQuery): void {
        this.pattern.getPatterns(query.page).
            pipe(tap((next: PageRequest) => {
                this.pageCount = next.pageCount;
                this.page = next.page;
                this.rawItems = next.items;
            })).subscribe( this.getPatternsStatusUpdate());
    }

    public navigateToChild(id: number): void {
        this.pattern.goToCard(id);
    }

}
