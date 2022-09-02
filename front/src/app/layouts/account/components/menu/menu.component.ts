import { Component, Injector } from '@angular/core';
import { MenuMiddlewareComponent } from 'src/app/shared/menu-middleware/menu-middleware.component';
import { SectionEnum } from 'src/app/utils/router-builder';

@Component({
    selector: 'amstore-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends MenuMiddlewareComponent {

    constructor(
        public injector: Injector
    ) {
        super(injector);
        this.initList(SectionEnum.Account);
    }

}
