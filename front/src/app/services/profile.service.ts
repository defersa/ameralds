import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getAction, HttpActions } from '../utils/action-builder';
import { AuthService } from './auth.service';
import { GoodsService } from './goods.service';

export interface ISmallProfile {
    username: string;
    email: string;
    godmode: boolean;
    goods: any;
    patterns: { id: number }[];
}

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    public profile$: BehaviorSubject<ISmallProfile | null> =
        new BehaviorSubject<ISmallProfile | null>(null);

    public godmodeStatus$: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);

    public boughtPatterns$: BehaviorSubject<number[]> =
        new BehaviorSubject<number[]>([]);

    constructor(
        private authService: AuthService,
        private goodsService: GoodsService,
        private httpClient: HttpClient
    ) {
        this.authService.authStatus.subscribe((status: boolean) => {
            if (status) {
                this.httpClient.get<ISmallProfile>(
                    getAction(HttpActions.Profile))
                    .subscribe((result: ISmallProfile) => {
                        this.profile$.next(result);
                        this.goodsService.goods = result.goods;
                        this.godmodeStatus$.next(result.godmode);
                        this.boughtPatterns$.next(result.patterns.map((item: { id: number }) => item.id))
                    });
                return;
            }
            this.profile$.next(null);
            this.godmodeStatus$.next(false);
            this.boughtPatterns$.next([]);
        });
    }
}
