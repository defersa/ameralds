import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { getAction, HttpAuthActions, HttpRootFragments } from 'src/app/utils/action-builder';
import { LocalStorageService } from '../core/services/local-storage.service';

const AUTH_TOKEN_NAME = 'authToken';
const EXPIRATION_DELTA = 'expirationDelta'
const REFRESH_EXPIRATION_DELTA = 'refreshExpirationDelta';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public get authToken(): string {
        return this.localStorage.getVariable(AUTH_TOKEN_NAME) as string;
    }

    public set authToken(token: string) {
        this.localStorage.setVariable(AUTH_TOKEN_NAME, token);
        this.authStatus.next(true);
    }

    constructor(
        private localStorage: LocalStorageService,
        private httpClient: HttpClient
    ) {
    }

    public getToken(value: { username: string, password: string }): void {
        this.httpClient.post( getAction(HttpAuthActions.GetToken, HttpRootFragments.Core), value)
            .subscribe(
                (result: unknown) => {
                    this.authToken = (result as Record<string, string>).token;
                    this.setExpirationDelta();
                    this.setRefreshExpirationDelta();
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                });
    }
    public initAuth(): void {
        this.refreshToken();
    }

    public logout(): void {
        this.authStatus.next(false);
        this.localStorage.removeVariable(AUTH_TOKEN_NAME);
        this.localStorage.removeVariable(EXPIRATION_DELTA);
        this.localStorage.removeVariable(REFRESH_EXPIRATION_DELTA);
    }

    private refreshToken(): void {
        if (
            this.authStatus &&
            Number(this.localStorage.getVariable(EXPIRATION_DELTA)) > Date.now() &&
            Number(this.localStorage.getVariable(REFRESH_EXPIRATION_DELTA)) > Date.now()
        ) {
            const oldToken: Record<string, string> = {
                token: this.authToken
            };
            this.httpClient.post(getAction(HttpAuthActions.RefreshToken, HttpRootFragments.Core), oldToken)
                .subscribe(
                    (result: unknown) => {
                        this.setExpirationDelta();
                        this.authToken = (result as Record<string, string>).token;
                    },
                    (error: HttpErrorResponse) => {
                        console.log(error.message);
                        this.logout();
                    });
                return;
        }
        this.authStatus.next(false);
    }

    private setExpirationDelta(): void {
        const nextExpiration: Date = new Date();;
        this.localStorage.setVariable(EXPIRATION_DELTA, String(nextExpiration.setDate(nextExpiration.getDate() + 7)));
    }

    private setRefreshExpirationDelta(): void {
        const nextExpiration: Date = new Date();;
        this.localStorage.setVariable(REFRESH_EXPIRATION_DELTA, String(nextExpiration.setDate(nextExpiration.getDate() + 7 * 8)));
    }
}
