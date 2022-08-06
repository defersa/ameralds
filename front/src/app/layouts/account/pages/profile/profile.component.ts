import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { ProfileService } from "@am/services/profile.service";
import { ProfileInterface } from "@am/interface/profile.interface";

@Component({
    selector: 'amstore-profile-page',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public user$?: Observable<ProfileInterface>;

    constructor(private _profile: ProfileService) { }

    ngOnInit(): void {
        this.user$ = this._profile.getOwnProfile();
    }

}
