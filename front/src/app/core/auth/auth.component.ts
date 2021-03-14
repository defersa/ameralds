import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
    selector: 'amstore-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    public authForm: FormGroup;

    constructor(
        private authService: AuthService
    ) {
        this.authForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl()
        });
    }

    ngOnInit(): void {
    }


    public submit(): void {
        this.authService.getToken(this.authForm.value);
    }
}
