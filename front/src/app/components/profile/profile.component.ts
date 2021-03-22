import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { getAction, HttpActions } from 'src/app/utils/action-builder';

interface ISmallProfile {
    username: string;
    email: string;
}

@Component({
    selector: 'amstore-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    host: {
        class: 'amstore-profile'
    }
})
export class ProfileComponent implements OnInit {

    public profile: ISmallProfile | null = null;

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService
    ) { }

    public ngOnInit(): void {
        this.authService.initAuth();
        this.authService.authStatus.subscribe((status: boolean) => {
            this.profile = null;
            if (status) {
                this.httpClient.get<ISmallProfile>(
                    getAction(HttpActions.Profile))
                    .subscribe((result: ISmallProfile) => this.profile = result);
            }
        });

    }
    public logout(): void {
        this.authService.logout();
    }

}
