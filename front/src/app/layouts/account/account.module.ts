import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';


export const routes: Routes = [{
    path: '', component: AccountComponent, children: [

    ]
}]


@NgModule({
    declarations: [AccountComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule
    ]
})
export class AccountModule { }
