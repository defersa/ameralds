import { HttpErrorResponse } from '@angular/common/http';
import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
    selector: 'amstore-dialog-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'amstore-dialog-login'
    }
})
export class AmstoreLoginComponent implements OnInit {
    public authForm: FormGroup;
    public error: boolean = false;

    public get username(): FormControl {
        return this.authForm.get('username') as FormControl;
    }

    public get password(): FormControl {
        return this.authForm.get('password') as FormControl;
    }

    constructor(
        private _matDialogRef: MatDialogRef<AmstoreLoginComponent>,
        private _authService: AuthService,
        private _profileService: ProfileService
    ) {
        this.authForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        });
    }

    public ngOnInit(): void {
    }

    public login(): void {
        this.error = false;
        this._profileService.getTokenRequest(this.authForm.value)
            .subscribe(
                (result: { token: string }) => {
                    this._authService.setToken(result);
                    this._matDialogRef.close();
                },
                (error: HttpErrorResponse) => {
                    this.error = true;
                });
    }

    @HostListener('keydown', ['$event'])
    private _onKeyDown(event: KeyboardEvent): void {
        if(event.key === 'Enter') {
            this.login();
        }
    }

}
