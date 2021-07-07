import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterService } from './services/router.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    constructor(
        private routerService: RouterService
    ) {
    }

}
