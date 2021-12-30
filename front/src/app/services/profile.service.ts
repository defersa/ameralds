import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { LocalStorageService } from '../core/services/local-storage.service';
import { getAction, HttpActions, HttpAuthActions, HttpRootFragments } from '../utils/action-builder';
import { LangDictionary, RU_LANG } from '../utils/lang-builder';
import { AccessEnum } from '../utils/router-builder';
import { AuthService } from './auth.service';
import { GoodsService } from './goods.service';

const LOCAL_MODER_NAME: string = "godmode";

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

    public moderStatus$: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false);

    public authAndModerStatus$: BehaviorSubject<AccessEnum> = new BehaviorSubject<AccessEnum>(AccessEnum.None);

    private get localModerStatus(): boolean {
        return this.localStorage.getVariable(LOCAL_MODER_NAME) ? true : false;
    }
    private set localModerStatus(status: boolean) {
        status ?
            this.localStorage.setVariable(LOCAL_MODER_NAME, String(true)) :
            this.localStorage.removeVariable(LOCAL_MODER_NAME);
    }

    public set rawBoughtPatterns(value: { id: number }[]) {
        this.boughtPatterns$.next(value.map((item: { id: number }) => item.id))
    }

    public get boughtPatterns(): number[] {
        return this.boughtPatterns$.getValue();
    }

    public boughtPatterns$: BehaviorSubject<number[]> =
        new BehaviorSubject<number[]>([]);

    public langDictionary$: BehaviorSubject<LangDictionary> = new BehaviorSubject<LangDictionary>(RU_LANG);

    constructor(
        private authService: AuthService,
        private goodsService: GoodsService,
        private localStorage: LocalStorageService,
        private httpClient: HttpClient
    ) {
        this.tryRefreshToken();

        this.moderStatus$.subscribe((status: boolean) => this.localModerStatus = status);
        this.moderStatus$.next(this.localModerStatus);

        this.moderStatus$.subscribe(() => this.updateAuthAndModerStatus());
        this.authService.authStatus.subscribe((status: boolean) => {
            this.updateAuthAndModerStatus();
            if (status) {
                this.httpClient.get<ISmallProfile>(
                    getAction(HttpActions.Profile))
                    .subscribe((result: ISmallProfile) => {
                        this.profile$.next(result);
                        this.goodsService.goods = result.goods;
                        this.rawBoughtPatterns = result.patterns;
                        this.moderStatus$.next(result.godmode);
                    });
                return;
            }
            this.profile$.next(null);
            this.moderStatus$.next(false);
            this.boughtPatterns$.next([]);
        });
    }
    private updateAuthAndModerStatus(): void {
        const status: AccessEnum = this.moderStatus$.getValue() ? AccessEnum.Moder :
            this.authService.authStatus.getValue() ? AccessEnum.Auth : AccessEnum.None;
        this.authAndModerStatus$.next(status);
    }


    public getTokenRequest(value: { username: string, password: string }): Observable<{ token: string }> {
        return this.httpClient.post<{ token: string }>(getAction(HttpAuthActions.GetToken, HttpRootFragments.Core), value);
    }


    private tryRefreshToken(): void {
        if (
            this.authService.authStatus &&
            this.authService.expirationDelta > Date.now() &&
            this.authService.refreshExpirationDelta > Date.now()
        ) {
            const oldToken: Record<string, string> = {
                token: this.authService.authToken
            };
            this.httpClient.post(getAction(HttpAuthActions.RefreshToken, HttpRootFragments.Core), oldToken)
                .subscribe(
                    (result: unknown) => {
                        this.authService.setExpirationDelta();
                        this.authService.authToken = (result as Record<string, string>).token;
                    },
                    (error: HttpErrorResponse) => {
                        console.log(error.message);
                        this.authService.logout();
                    });
            return;
        }
        this.authService.logout();
    }
}
