import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
    selector: 'amstore-goods-lite',
    templateUrl: './goods-lite.component.html',
    styleUrls: ['./goods-lite.component.scss']
})
export class GoodsLiteComponent implements OnInit {

    public get goodsCount(): Subject<number> {
        return this.goodsService.goodsCount;
    }
    public get goodsPrice(): Subject<number> {
        return this.goodsService.goodsPrice;
    }

    constructor(
        private goodsService: GoodsService
    ) { }

    ngOnInit(): void {
    }

}
