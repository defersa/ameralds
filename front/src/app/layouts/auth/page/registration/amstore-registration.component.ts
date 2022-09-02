import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { CustomValidatorFns } from "@am/cdk/forms/custom-validators-fn";
import { ProfileService } from "@am/services/profile.service";
import { formAsyncErrorHandler } from "@am/cdk/forms/form-async-error.handler";
import { AuthRegistrationRequest } from "@am/interface/request/auth-request.interface";
import { RouterService } from "@am/services/router.service";
import { DialogService } from "@am/core/dialog/dialog.service";

@Component({
    selector: 'amstore-registration',
    templateUrl: './amstore-registration.component.html',
    styleUrls: ['./amstore-registration.component.scss']
})
export class AmstoreRegistrationComponent implements OnInit {

    public regForm: UntypedFormGroup;
    public isAccept: UntypedFormControl = new UntypedFormControl(false);

    constructor(
        private _profileService: ProfileService,
        private _routerService: RouterService,
        private _dialogService: DialogService,
    ) {
        const passwordControl: UntypedFormControl = new UntypedFormControl(null, [CustomValidatorFns.getPasswordComplexity]);
        this.regForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, [CustomValidatorFns.isEmail]),
            password: passwordControl,
            passwordRepeat: new UntypedFormControl(null, [CustomValidatorFns.getEqualPassword(passwordControl)]),
            firstName: new UntypedFormControl(),
            lastName: new UntypedFormControl()
        });

    }

    ngOnInit(): void {
    }

    public sendUser(): void {
        if (this.regForm.invalid) {
            return;
        }
        formAsyncErrorHandler(
            this.regForm,
            this._profileService.postNewUser(this.regForm.value)
        ).subscribe((response: AuthRegistrationRequest) => {
            if (response.result) {
                this._routerService.goToRoot()
                    .subscribe(() =>
                        this._dialogService.openDialog({
                            maxWidth: '400px',
                            data: {
                                title: 'Успешно',
                                smallTitle: 'Профиль успешно создан.',
                                text: 'Для завершения регистрации требуется подтвердить аккаунт. Вам на почту выслано письмо с ссылкой на страницу с подтверждением аккаунта.'
                            }
                        }));
            }
        }, () => {});
    }
}
