import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./layouts/store/store.module').then(m => m.StoreModule)
    },
    {
        path: 'account',
        loadChildren: () => import('./layouts/account/account.module').then(m => m.AccountModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
