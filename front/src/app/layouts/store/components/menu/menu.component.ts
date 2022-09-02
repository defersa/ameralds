import { Component, Injector } from '@angular/core';
import { MenuMiddlewareComponent } from 'src/app/shared/menu-middleware/menu-middleware.component';
import { ProfileService } from 'src/app/services/profile.service';
import { SectionEnum } from 'src/app/utils/router-builder';

@Component({
    selector: 'amstore-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent extends MenuMiddlewareComponent {

    public profileService: ProfileService;

    constructor(
        public injector: Injector
    ) {
        super(injector);
        this.profileService = injector.get(ProfileService);
        this.initList(SectionEnum.Store);
    }

}
