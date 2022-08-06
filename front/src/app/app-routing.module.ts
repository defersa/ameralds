import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountRoutes, StoreRoutes } from './utils/routs-name';
import { AuthRoutes } from "@am/utils/router-builder";


export const routes: Routes = [
    {
        path: StoreRoutes.Store,
        loadChildren: () => import('./layouts/store/store.module').then(m => m.StoreModule)
    },
    {
        path: AccountRoutes.Account,
        loadChildren: () => import('./layouts/account/account.module').then(m => m.AccountModule)
    },
    {
        path: AuthRoutes.Auth,
        loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
