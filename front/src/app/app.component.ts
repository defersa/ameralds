import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-root',
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
    ) {
    }

}
