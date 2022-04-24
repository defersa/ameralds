import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ISmallProfile, ProfileService } from 'src/app/services/profile.service';

import { AmstoreLoginComponent } from './login/login.component';


@Component({
    selector: 'amstore-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    host: {
        class: 'amstore-profile'
    }
})
export class ProfileComponent implements OnInit {

    public get godmode(): BehaviorSubject<boolean> {
        return this.profileService.moderStatus$;
    }

    public get authStatus(): BehaviorSubject<boolean> {
        return this.authService.authStatus;
    }


    public get profile(): ISmallProfile | null {
        return this._profile;
    }
    public set profile(value: ISmallProfile | null) {
        this._profile = value;
    }

    private _profile: ISmallProfile | null = null;

    constructor(
        private authService: AuthService,
        private profileService: ProfileService,
        private _dialog: MatDialog
    ) {
    }

    public ngOnInit(): void {
    }

    public login(): void {
        this._dialog.open( AmstoreLoginComponent, {
            panelClass: "amstore-dialog-login-panel",
            minWidth: '350px'
        });
    }

    public logout(): void {
        this.authService.logout();
    }

}
