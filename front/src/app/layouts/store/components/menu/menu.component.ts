import { Component, Injector } from '@angular/core';
import { MenuMiddlewareComponent } from 'src/app/shared/menu-middleware/menu-middleware.component';
import { ProfileService } from 'src/app/services/profile.service';
import { STORE_ROUTES } from 'src/app/utils/router-builder';

@Component({
    selector: 'amstore-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends MenuMiddlewareComponent {

    public profileService: ProfileService;

    constructor(
        public injector: Injector
    ) {
        super(injector);
        this.profileService = injector.get(ProfileService);
        this.initList(STORE_ROUTES, 'store');
    }

}
