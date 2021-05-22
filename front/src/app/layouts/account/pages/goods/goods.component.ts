import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GoodsCard } from 'src/app/interface/goods.intreface';
import { SmallPattern } from 'src/app/interface/pattern.interface';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
    selector: 'app-goods',
    templateUrl: './goods.component.html',
    styleUrls: ['./goods.component.scss']
})
export class GoodsComponent implements OnInit, OnDestroy {

    protected destroyed: Subject<void> = new Subject<void>();

    public patterns: SmallPattern[] = [];
    public jewels: any[] = [];

    public get totalPrice(): Subject<number> {
        return this.goodsService.goodsPrice;
    };

    constructor(
        private goodsService: GoodsService
    ) {
        this.goodsService.goods$.pipe(takeUntil(this.destroyed)).subscribe((item: GoodsCard) => {
            this.patterns = item.patterns;
            this.jewels = item.jewels;
        })
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }
    public buy(): void {
        this.goodsService.buyGoods().subscribe((result: any) => {

        });
    }

}
