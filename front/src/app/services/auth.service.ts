import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from '../core/services/local-storage.service';

const AUTH_TOKEN_NAME = 'authToken';
const EXPIRATION_DELTA = 'expirationDelta'
const REFRESH_EXPIRATION_DELTA = 'refreshExpirationDelta';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public authStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.authToken);

    public get authToken(): string {
        return this.localStorage.getVariable(AUTH_TOKEN_NAME) as string;
    }

    public set authToken(token: string) {
        this.localStorage.setVariable(AUTH_TOKEN_NAME, token);
        this.authStatus.next(true);
    }
    public get expirationDelta(): number {
        return Number(this.localStorage.getVariable(EXPIRATION_DELTA));
    }
    public get refreshExpirationDelta(): number {
        return Number(this.localStorage.getVariable(REFRESH_EXPIRATION_DELTA));
    }

    constructor(
        private localStorage: LocalStorageService
    ) {
    }

    public setToken(token: string): void {
        this.authToken = token;
        this.setExpirationDelta();
        this.setRefreshExpirationDelta();
    }

    public logout(): void {
        this.authStatus.next(false);
        this.localStorage.removeVariable(AUTH_TOKEN_NAME);
        this.localStorage.removeVariable(EXPIRATION_DELTA);
        this.localStorage.removeVariable(REFRESH_EXPIRATION_DELTA);
    }


    public setExpirationDelta(): void {
        const nextExpiration: Date = new Date();
        this.localStorage.setVariable(EXPIRATION_DELTA, String(nextExpiration.setDate(nextExpiration.getDate() + 7)));
    }

    public setRefreshExpirationDelta(): void {
        const nextExpiration: Date = new Date();
        this.localStorage.setVariable(REFRESH_EXPIRATION_DELTA, String(nextExpiration.setDate(nextExpiration.getDate() + 7 * 8)));
    }
}
