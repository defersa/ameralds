import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { CustomValidatorFns } from "@am/cdk/forms/custom-validators-fn";
import { ProfileService } from "@am/services/profile.service";

@Component({
    selector: 'amstore-registration',
    templateUrl: './amstore-registration.component.html',
    styleUrls: ['./amstore-registration.component.scss']
})
export class AmstoreRegistrationComponent implements OnInit {

    public regForm: UntypedFormGroup;
    public isAccept: UntypedFormControl = new UntypedFormControl(false);

    constructor(
        private _profileService: ProfileService
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
        console.log(this.regForm.invalid)
        if(this.regForm.invalid){
            return;
        }
        this._profileService.postNewUser(this.regForm.value)
            .subscribe((result: unknown) => console.log(result));
    }
}
