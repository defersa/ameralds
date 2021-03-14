import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public get authToken(): string {
        return this.localStorage.getVariable('authToken') as string;
    }

    public set authToken(token: string) {
        this.localStorage.setVariable('authToken', token);
    }

    constructor(
        private localStorage: LocalStorageService,
        private httpClient: HttpClient
    ) {
    }

    public getToken(value: { username: string, password: string }): void {
        this.httpClient.post('http://localhost:8000/api-token-auth/', value)
            .subscribe(
                (result: { token: string }) => {
                    this.authToken = result.token;
                },
                (error: HttpErrorResponse) => {
                    console.log(error.message);
                });
    }
}
