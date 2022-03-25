import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { GoodsComponent } from './pages/goods/goods.component';
import { AccountRoutes } from 'src/app/utils/routs-name';
import { OrdersComponent } from './pages/orders/orders.component';
import { AmstorePaginatedPageModule } from 'src/app/shared/paginated-page/paginated-page.module';
import { PatternsComponent } from './pages/patterns/patterns.component';
import { AmstoreCdkModule } from '@am/cdk/cdk.module';


export const routes: Routes = [{
    path: '', component: AccountComponent, children: [
        {
            path: '',
            component: GoodsComponent,
        },
        {
            path: AccountRoutes.Goods,
            component: GoodsComponent,
        },
        {
            path: AccountRoutes.Orders,
            component: OrdersComponent,
        },
        {
            path: AccountRoutes.Patterns,
            component: PatternsComponent,
        },
    ]
}]


@NgModule({
    declarations: [AccountComponent, MenuComponent, GoodsComponent, OrdersComponent, PatternsComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        AmstoreCdkModule,
        AmstorePaginatedPageModule
    ]
})
export class AccountModule { }
