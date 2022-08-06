import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { LocalStorageService } from '../core/services/local-storage.service';
import {
    getAction,
    HttpActions,
    HttpAuthActions,
    HttpProfileActions,
    RestSuffixFragments
} from '../utils/action-builder';
import { AccessEnum } from '../utils/router-builder';
import { AuthService } from './auth.service';
import { GoodsService } from './goods.service';
import { ReCAPTCHA } from "@am/interface/recapcha";
import { environment } from "../../environments/environment";
import { map, switchMap } from "rxjs/operators";

import * as moment from 'moment';
import {
    AuthRequestPayload,
    AuthResponse,
    ISmallProfile,
    ProfileInterface,
    ProfileInterfaceResponse
} from "@am/interface/profile.interface";

declare var grecaptcha: ReCAPTCHA;

const LOCAL_MODER_NAME: string = "isStaff";


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
        return !!this.localStorage.getVariable(LOCAL_MODER_NAME);
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

    public authWithRecaptchaToken(value: AuthRequestPayload): Observable<AuthResponse> {
        return from(grecaptcha.execute(environment.recaptcha.siteKey, {action: 'submit'}))
            .pipe(
                switchMap((token: string) =>
                    this.httpClient.post<{ token: string }>(getAction(HttpAuthActions.TokenAuth, RestSuffixFragments.Auth), {token, ...value}))
            )
    }

    public getOwnProfile(): Observable<ProfileInterface> {
        return this.httpClient.get<ProfileInterfaceResponse>(getAction(HttpProfileActions.Own, RestSuffixFragments.Profile))
            .pipe(
                map((response: ProfileInterfaceResponse) => ({
                    ...response.user,
                    dateJoined: moment(response.user.date_joined).format("YYYY.MM.DD HH:mm"),
                    isStaff: response.user.is_staff
                })));
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
            this.httpClient.post(getAction(HttpAuthActions.RefreshToken, RestSuffixFragments.Auth), oldToken)
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
