import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmstoreAdminComponent } from './admin.component';
import { RouterModule, Routes } from "@angular/router";
import { MenuComponent } from "./components/menu/menu.component";
import { AmstoreCdkModule } from "@am/cdk/cdk.module";
import { AmstoreSharedModule } from "@am/shared/shared.module";


export const routes: Routes = [{
    path: '',
    component: AmstoreAdminComponent,
    children: [
    ]
}];

@NgModule({
    declarations: [
        AmstoreAdminComponent,
        MenuComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AmstoreCdkModule,
        AmstoreSharedModule
    ]
})
export class AdminModule {
}
