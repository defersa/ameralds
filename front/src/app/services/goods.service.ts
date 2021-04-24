import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { LocalStorageService } from '../core/services/local-storage.service';
import { getAction, HttpActions } from '../utils/action-builder';

export type GoodsCard = {
    jewels: ProductLite[];
    patterns: ProductLite[];
    id: number;
}
export type GoodsModifire = {
    goods: GoodsCard;
    result: boolean;
}
export enum PriceLocation {
    EN = 'price_en',
    RU = 'price_ru'
}

export enum ProductType {
    Patterns = 'patterns',
    Jewels = 'jewels'
}

export type ProductLite = {
    id: number;
    price_en: number;
    price_ru: number;
}
const LOCAL_GOODS_NAME: string = 'localGoods';

@Injectable({
    providedIn: 'root'
})
export class GoodsService {

    public goods$: BehaviorSubject<GoodsCard>;

    public goodsCount: Subject<number> = new Subject<number>();
    public goodsPrice: Subject<number> = new Subject<number>();

    public get localGoods(): GoodsCard {
        const local: string = this.localStorage.getVariable(LOCAL_GOODS_NAME) as string;
        return local ? JSON.parse(local) : {
            id: 0,
            jewels: [],
            patterns: []
        };
    }

    public set localGoods(value: GoodsCard) {
        this.localStorage.setVariable(LOCAL_GOODS_NAME, JSON.stringify(value));
    }

    constructor(
        private localStorage: LocalStorageService,
        private authService: AuthService,
        private httpClient: HttpClient
    ) {
        this.goods$ = new BehaviorSubject<GoodsCard>(this.localGoods);

        this.goods$.subscribe((goods: GoodsCard) => {
            this.goodsCount.next(goods.jewels.length + goods.patterns.length);

            this.goodsPrice.next(goods.jewels.reduce((acc: number, item: ProductLite) => acc + item[PriceLocation.EN], 0)
                + goods.patterns.reduce((acc: number, item: ProductLite) => acc + item[PriceLocation.EN], 0));
        })
    }

    public addProduct(type: ProductType, product: ProductLite): Observable<any> {
        if (this.authService.authStatus.value) {
            return this.httpClient
                .post<GoodsModifire>(getAction(HttpActions.AddProduct), { id: product.id, productType: type })
                .pipe(
                    tap((request: GoodsModifire) => this.goods$.next(request.goods))
                );
        }
        const value: GoodsCard = this.localGoods;
        value[type].push(product);
        this.goods$.next(value);

        return of({
            result: true,
            goods: value
        });
    }

    public removeProduct(type: ProductType, id: number): Observable<any> {
        if (this.authService.authStatus.value) {
            return this.httpClient
                .post<GoodsModifire>(getAction(HttpActions.RemoveProduct), { id: id, productType: type })
                .pipe(
                    tap((request: GoodsModifire) => this.goods$.next(request.goods))
                );
        }
        const value: GoodsCard = this.localGoods;
        value[type] = value[type].filter((value: ProductLite) => value.id !== id );
        this.goods$.next(value);

        return of({
            result: true,
            goods: value
        });
    }
}
