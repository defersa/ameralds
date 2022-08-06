import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'amstore-registration',
    templateUrl: './amstore-registration.component.html',
    styleUrls: ['./amstore-registration.component.scss']
})
export class AmstoreRegistrationComponent implements OnInit {

    public regForm: UntypedFormGroup = new UntypedFormGroup({
       password: new UntypedFormControl(null, [Validators.required]),
       passwordRepeat: new UntypedFormControl(null, [Validators.required])
    });

    constructor() { }

    ngOnInit(): void {
    }

}
