import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'amstore-registration',
    templateUrl: './amstore-registration.component.html',
    styleUrls: ['./amstore-registration.component.scss']
})
export class AmstoreRegistrationComponent implements OnInit {

    public regForm: FormGroup = new FormGroup({
       password: new FormControl(null, [Validators.required]),
       passwordRepeat: new FormControl(null, [Validators.required])
    });

    constructor() { }

    ngOnInit(): void {
    }

}
