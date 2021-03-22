import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(
        private httpClient: HttpClient
    ) {
    }

    public test(): void {
        this.httpClient.get('http://localhost:8000/try-authorized/')
        .subscribe((result: unknown) => console.log(result));
    }

}
