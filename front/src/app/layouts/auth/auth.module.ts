import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmstoreAuthComponent } from './amstore-auth.component';
import { AmstoreRegistrationComponent } from './page/registration/amstore-registration.component';
import { RouterModule, Routes } from "@angular/router";
import { AmstoreCanActivatePage } from "../../store.guard";
import { AuthRoutes } from "@am/utils/routs-name";
import { AmstoreCdkModule } from "@am/cdk/cdk.module";

export const routes: Routes = [{
    path: '',
    component: AmstoreAuthComponent,
    children: [
        {
            path: AuthRoutes.Registration,
            component: AmstoreRegistrationComponent,
            canActivate: [AmstoreCanActivatePage]
        },
    ]
}];


@NgModule({
    declarations: [AmstoreAuthComponent, AmstoreRegistrationComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AmstoreCdkModule
    ]
})
export class AuthModule {
}
