import { Component, Injector, OnInit } from '@angular/core';
import { MenuListType, MenuMiddlewareComponent } from 'src/app/components/menu-middleware/menu-middleware.component';
import { ProfileService } from 'src/app/services/profile.service';
import { AccountRoutes, StoreRoutes } from 'src/app/utils/routs-name';

const LIST_MAP: MenuListType[] = [
    { label: 'Аккаунт', pathFragment: [AccountRoutes.Account],  },
    { label: 'Схемы', pathFragment: [StoreRoutes.Patterns] },
    { label: 'Добавить схему', pathFragment: [StoreRoutes.PatternAdd], onlyModer: true },
    { label: 'Украшения', pathFragment: [StoreRoutes.Jewelrys] }
]

@Component({
    selector: 'amstore-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent extends MenuMiddlewareComponent implements OnInit {

    public profileService: ProfileService;

    constructor(
        public injector: Injector
    ) {
        super(injector);
        this.profileService = injector.get(ProfileService);
        this.initList(LIST_MAP);
    }
    public ngOnInit(): void {
        this.profileService.godmodeStatus$.subscribe((status: boolean) => {
            const listMap: MenuListType[] = status ? LIST_MAP : LIST_MAP.filter((item: MenuListType) => !item.onlyModer);
            this.initList(listMap);
        });
    }

}
