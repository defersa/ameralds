import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RecaptchaDirective } from "../../recaptcha/recaptcha.directive";
import { AuthService } from "@am/services/auth.service";
import { ProfileService } from "@am/services/profile.service";
import { AuthResponse } from "@am/interface/profile.interface";


@Component({
    selector: 'amstore-dialog-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'amstore-dialog-login'
    }
})
export class AmstoreLoginComponent extends RecaptchaDirective {
    public authForm: FormGroup;
    public error: string | undefined;

    public passwordType: 'text' | 'password' = 'password';

    public get username(): FormControl {
        return this.authForm.get('username') as FormControl;
    }

    public get password(): FormControl {
        return this.authForm.get('password') as FormControl;
    }

    private errorName: string = 'auth';


    constructor(
        private _matDialogRef: MatDialogRef<AmstoreLoginComponent>,
        private _authService: AuthService,
        private _profileService: ProfileService
    ) {
        super();
        this.authForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });

        this.authForm.valueChanges.subscribe(() => {
            this.error = undefined;
            this.authForm.controls.username.setErrors(this._removeAuthError(this.authForm.controls.username.errors));
            this.authForm.controls.password.setErrors(this._removeAuthError(this.authForm.controls.password.errors));
        });
    }

    public login(): void {
        if (this.authForm.invalid) {
            this.authForm.markAsTouched();
            return;
        }
        this._profileService.authWithRecaptchaToken(this.authForm.value)
            .subscribe(
                (result: AuthResponse) => {
                    if (result.token) {
                        this._authService.setToken(result.token);
                        this._matDialogRef.close();
                    }
                    if (result.error || !result.token) {
                        this.error = result.error || 'Неизвестная ошибка, попробуйте позже';
                    }
                },
                (error: HttpErrorResponse) => {
                    this.error = 'Неверный логин или пароль';
                    this.authForm.controls.username.setErrors({[this.errorName]: true});
                    this.authForm.controls.password.setErrors({[this.errorName]: true});
                    this.authForm.markAsPristine();
                }
            )
    }

    public changePasswordType(): void {
        this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    }

    private _removeAuthError(errors: ValidationErrors | null): ValidationErrors | null {
        if (errors === null) {
            return null;
        }
        const keys: string[] = Object.keys(errors)
            .filter((key: string) => key !== this.errorName);
        return keys.length > 0 ? keys.reduce((error: ValidationErrors, key: string) => ({
            ...error,
            [key]: error[key]
        }), {}) : null;
    }

}
