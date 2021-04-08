import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountRoutes, StoreRoutes } from './utils/routs-name';


export const routes: Routes = [
    {
        path: StoreRoutes.Store,
        loadChildren: () => import('./layouts/store/store.module').then(m => m.StoreModule)
    },
    {
        path: AccountRoutes.Account,
        loadChildren: () => import('./layouts/account/account.module').then(m => m.AccountModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
