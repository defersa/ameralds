import { Component, OnInit } from '@angular/core';
import { AccountRoutes, SectionEnum } from "@am/utils/router-builder";
import { RouterService } from "@am/services/router.service";

@Component({
    selector: 'amstore-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    host: {
        class: 'amstore-header'
    }
})
export class HeaderComponent implements OnInit {
    public linkToRoot: string[] = this._navigation.generateLink(SectionEnum.Store, AccountRoutes.Patterns);

    constructor(
        private _navigation: RouterService
    ) {
    }

    ngOnInit(): void {
    }

}
