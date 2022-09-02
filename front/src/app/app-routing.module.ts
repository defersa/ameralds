import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionEnum } from "@am/utils/router-builder";


export const routes: Routes = [
    {
        path: SectionEnum.Store,
        loadChildren: () => import('./layouts/store/store.module').then(m => m.StoreModule)
    },
    {
        path: SectionEnum.Account,
        loadChildren: () => import('./layouts/account/account.module').then(m => m.AccountModule)
    },
    {
        path: SectionEnum.Auth,
        loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: SectionEnum.Admin,
        loadChildren: () => import('./layouts/admin/admin.module').then(m => m.AdminModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
