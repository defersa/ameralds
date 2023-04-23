import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IProfile } from "@am/interface/profile.interface";
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { AuthService } from "@am/services/auth.service";

@Component({
    selector: 'amstore-profile-card',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'amstore-profile-card amstore-card-container'
    }
})
export class AmstoreProfileCardComponent implements OnInit {
    @Input()
    public set user(value: IProfile) {
        this._user = value;
        this.mainFromGroup.setValue({
            username: value.username,
            email: value.email
        })
    }
    public get user(): IProfile { return this._user; }
    private _user: IProfile = USER_MOCK;

    public mainFromGroup: UntypedFormGroup = new UntypedFormGroup({
        username: new UntypedFormControl({ value: '', disabled: true }, [Validators.required]),
        email: new UntypedFormControl({ value: '', disabled: true }, [Validators.required])
    });

    constructor(private _auth: AuthService) { }

    ngOnInit(): void {
    }

    public logout(): void {
        this._auth.logout();
    }

}

const USER_MOCK: IProfile = {
    id: 0,
    username: '',
    email: '',
    dateJoined: '',
    isStaff: false,
    person: {
        verify: false,
        location: 'ru'
    }
}
