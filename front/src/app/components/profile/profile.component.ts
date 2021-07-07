import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ISmallProfile, ProfileService } from 'src/app/services/profile.service';


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


    public get profile(): ISmallProfile | null {
        return this._profile;
    }
    public set profile(value: ISmallProfile | null) {
        this._profile = value;
    }

    private _profile: ISmallProfile | null = null;

    constructor(
        private authService: AuthService,
        private profileService: ProfileService
    ) {
        this.profileService.profile$
            .subscribe((profile: ISmallProfile | null) => this.profile = profile);
    }

    public ngOnInit(): void {
    }
    public logout(): void {
        this.authService.logout();
    }

}
