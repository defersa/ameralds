import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { GoodsComponent } from './pages/goods/goods.component';
import { AccountRoutes } from 'src/app/utils/routs-name';


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
    ]
}]


@NgModule({
    declarations: [AccountComponent, MenuComponent, GoodsComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ]
})
export class AccountModule { }
