import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AuthRoutes } from "@am/utils/routs-name";
import { AmstoreCdkModule } from "@am/cdk/cdk.module";

import { AuthComponent } from './auth.component';
import { AmstoreRegistrationComponent } from './page/registration/amstore-registration.component';
import { AmstoreVerifyComponent } from "./page/verify/amstore-verify.component";
import { AmstoreCanActivatePage } from "../../store.guard";

export const routes: Routes = [{
    path: '',
    component: AuthComponent,
    children: [
        {
            path: AuthRoutes.Registration,
            component: AmstoreRegistrationComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: AuthRoutes.Verify,
            component: AmstoreVerifyComponent,
            canActivate: [AmstoreCanActivatePage]
        },
    ]
}];


@NgModule({
    declarations: [AuthComponent, AmstoreRegistrationComponent, AmstoreVerifyComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AmstoreCdkModule
    ]
})
export class AuthModule {
}
