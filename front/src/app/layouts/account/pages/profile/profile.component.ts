import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { ProfileService } from "@am/services/profile.service";
import { IProfile } from "@am/interface/profile.interface";
import { DialogService } from "@am/core/dialog/dialog.service";

@Component({
    selector: 'amstore-profile-page',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

    public user$?: Observable<IProfile>;

    constructor(
        private _profile: ProfileService,
        private _dialog: DialogService
    ) { }

    ngOnInit(): void {
        this.user$ = this._profile.getOwnProfile();
    }

    public sendVerify(): void {
        this._profile.sendVerify().subscribe((result: unknown) =>
            this._dialog.openDialog({
                maxWidth: '400px',
                data: {
                    title: 'Успешно',
                    smallTitle: 'Письмо с ссылкой успешно выслано.',
                    text: 'Для завершения регистрации проверьте почту и пройдите по ссылке из письма.'
                }
            }));
    }
}
