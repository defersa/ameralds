import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { ISmallProfile } from "@am/interface/profile.interface";
import { ProfileService } from "@am/services/profile.service";

import { AmstoreLoginComponent } from './login/login.component';
import { DialogService } from "../dialog/dialog.service";
import { RouterService } from "@am/services/router.service";
import { AccountRoutes, AuthRoutes, SectionEnum } from "@am/utils/router-builder";


@Component({
    selector: 'amstore-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    host: {
        class: 'amstore-profile'
    }
})
export class ProfileComponent {

    public linkToProfile: string[] = this._navigation.generateLink(SectionEnum.Account, AccountRoutes.Profile);
    public linkToRegistration: string[] = this._navigation.generateLink(SectionEnum.Auth, AuthRoutes.Registration);

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
        private _dialog: DialogService,
        private _navigation: RouterService
    ) {
    }

    public login(): void {
        this._dialog.openCustomDialog(AmstoreLoginComponent, {
            panelClass: "amstore-dialog-login-panel",
            minWidth: '400px'
        });
    }

    public logout(): void {
        this.authService.logout();
    }
}
