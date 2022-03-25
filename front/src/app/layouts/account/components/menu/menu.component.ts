import { Component, Injector } from '@angular/core';
import { MenuListType, MenuMiddlewareComponent } from 'src/app/shared/menu-middleware/menu-middleware.component';
import { ACCOUNT_ROUTES } from 'src/app/utils/router-builder';
import { AccountRoutes, StoreRoutes } from 'src/app/utils/routs-name';

// const LIST_MAP: MenuListType[] = [
//     { label: 'Магазин', pathFragment: [StoreRoutes.Store] },
//     { label: 'Аккаунт', pathFragment: [AccountRoutes.Account]},
//     { label: 'Корзина', pathFragment: [AccountRoutes.Account, AccountRoutes.Goods] },
//     { label: 'Заказы', pathFragment: [AccountRoutes.Account, AccountRoutes.Orders] },
//     { label: 'Купленные схемы', pathFragment: [AccountRoutes.Account, AccountRoutes.Patterns] }
// ]

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
        this.initList(ACCOUNT_ROUTES, 'account');
    }

}
