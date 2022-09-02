import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { CustomValidatorFns } from "@am/cdk/forms/custom-validators-fn";
import { ProfileService } from "@am/services/profile.service";
import { formAsyncErrorHandler } from "@am/cdk/forms/form-async-error.handler";
import { AuthRegistrationRequest } from "@am/interface/request/auth-request.interface";
import { RouterService } from "@am/services/router.service";
import { DialogService } from "@am/core/dialog/dialog.service";
import { ActivatedRoute, Params } from "@angular/router";
import { switchMap, take, takeUntil } from "rxjs/operators";
import { of } from "rxjs";
import { ResultRequest } from "@am/interface/request.interface";

@Component({
    selector: 'amstore-verify',
    template: '<amstore-spinner></amstore-spinner>',
    styles: [`
        amstore-spinner {
            margin: auto;
        }
    `]
})
export class AmstoreVerifyComponent implements OnInit {

    constructor(
        private _activateRoute: ActivatedRoute,
        private _profile: ProfileService,
        private _navigator: RouterService,
        private _dialog: DialogService
    ) {

        this._activateRoute.queryParams?.pipe(
            take(1),
            switchMap((params: Params) => {
                if (!params.user || !params.token) {
                    return of({ result: false });
                }
                return this._profile.verifyProfile({ user: params.user, token: params.token });
            })
        ).subscribe((response: ResultRequest) => {
            this._navigator.goToRoot().subscribe(() => {
                this._dialog.openDialog({
                    data: {
                        title: response.result ? "Успешно" : "Ошибка",
                        text: response.result ? "Аккаунт был подтвержден. Теперь вам доступны все функции"
                            : "Что пошло не так: попробуйте повторно перейти по ссылке или перезапросите письмо"
                    }
                })
            })
        });
    }

    ngOnInit(): void {
    }

}
