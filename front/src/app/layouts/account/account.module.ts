import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountRoutes } from 'src/app/utils/routs-name';
import { AmstorePaginatedPageModule } from 'src/app/shared/paginated-page/paginated-page.module';
import { AmstoreCdkModule } from '@am/cdk/cdk.module';
import { AmstoreCardModule } from "@am/shared/card/card.module";

import { AccountComponent } from './account.component';
import { MenuComponent } from './components/menu/menu.component';
import { GoodsComponent } from './pages/goods/goods.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { PatternsComponent } from './pages/patterns/patterns.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AmstoreCanActivatePage } from "../../store.guard";


export const routes: Routes = [{
    path: '', component: AccountComponent, children: [
        {
            path: '',
            component: GoodsComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: AccountRoutes.Goods,
            component: GoodsComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: AccountRoutes.Orders,
            component: OrdersComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: AccountRoutes.Patterns,
            component: PatternsComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: AccountRoutes.Profile,
            component: ProfileComponent,
            canActivate: [AmstoreCanActivatePage]
        },
    ]
}]


@NgModule({
    declarations: [AccountComponent, MenuComponent, GoodsComponent, OrdersComponent, PatternsComponent, ProfileComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AmstoreCdkModule,
        AmstorePaginatedPageModule,
        AmstoreCardModule
    ]
})
export class AccountModule { }
