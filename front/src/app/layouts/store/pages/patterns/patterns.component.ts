import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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

    public get queryParams$(): Observable<Params> {
        return this.activateRoute.queryParams?.pipe(
            takeUntil(this.destroyed)
        );
    }

    constructor(
        private activateRoute: ActivatedRoute,
        private pattern: PatternService,
        private profileService: ProfileService,
        private goodsService: GoodsService,
        private router: Router
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
        this.initQuerySubscribe();
    }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

    public setQueryParams(page: number): void {
        this.pattern.queryParams = { page };
        this.router.navigate([], {
            relativeTo: this.activateRoute,
            queryParams: this.pattern.queryParams,
            queryParamsHandling: 'merge',
            skipLocationChange: false
        })
    }

    public initQuerySubscribe(): void {
        this.activateRoute.queryParams?.pipe(
            takeUntil(this.destroyed)
        ).subscribe((params: Params) => {
            this.pattern.queryParams = params;
            this.nextPage(params.page ? params.page : 1);
        });
    }

    public nextPage(page: number): void {
        this.pattern.getPatterns(page).subscribe((next: PageRequest) => {
            this.pageCount = next.pageCount;
            this.page = next.page;
            this.rawItems = next.items;
            this.getPatternsStatusUpdate()();
        })
    }

    public navigateToChild(id: number): void {
        this.pattern.goToCard(id);
    }

}
