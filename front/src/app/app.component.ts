import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from "@am/services/auth.service";


@Component({
    selector: 'amstore-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'amstore-root'
    }
})
export class AppComponent {

    public date: Date = new Date();

    constructor(
        private authService: AuthService,
    ) {
        this.authService.tryRefreshToken();
    }
}
