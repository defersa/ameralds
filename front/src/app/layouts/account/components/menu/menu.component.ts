import { Component, Injector } from '@angular/core';
import { ListType, MenuMiddlewareComponent } from 'src/app/components/menu-middleware/menu-middleware.component';
import { AccountRoutes, StoreRoutes } from 'src/app/utils/routs-name';

const LIST_MAP: ListType[] = [
    { label: 'Магазин', pathFragment: [StoreRoutes.Store] },
    { label: 'Аккаунт', pathFragment: [AccountRoutes.Account]},
    { label: 'Корзина', pathFragment: [AccountRoutes.Account, AccountRoutes.Goods] }
]

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
        this.initList(LIST_MAP);
    }

}
