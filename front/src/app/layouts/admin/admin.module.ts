import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmstoreAdminComponent } from './admin.component';
import { RouterModule, Routes } from "@angular/router";
import { MenuComponent } from "./components/menu/menu.component";
import { AmstoreCdkModule } from "@am/cdk/cdk.module";
import { AmstoreSharedModule } from "@am/shared/shared.module";
import { AdminRoutes } from "@am/utils/router-builder";
import { AmstoreCanActivatePage } from "@am/root/store.guard";
import { PatternsComponent } from "@am/root/layouts/admin/pages/pattern/patterns/patterns.component";
import { PatternCardComponent } from "@am/root/layouts/admin/pages/pattern/pattern-card/pattern-card.component";
import { PatternAddComponent } from "@am/root/layouts/admin/pages/pattern/pattern-add/pattern-add.component";
import { PatternModule } from "@am/shared/actions/pattern/pattern.module";


export const routes: Routes = [{
    path: '',
    component: AmstoreAdminComponent,
    children: [
        {
            path: '',
            redirectTo: AdminRoutes.Patterns,
        },
        {
            path: AdminRoutes.Patterns,
            component: PatternsComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: AdminRoutes.PatternCard + '/:id',
            component: PatternCardComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: AdminRoutes.PatternAdd,
            component: PatternAddComponent,
            canActivate: [AmstoreCanActivatePage]
        },
        {
            path: AdminRoutes.PatternEdit + '/:id',
            component: PatternAddComponent,
            canActivate: [AmstoreCanActivatePage]
        },
    ]
}];

const PAGES = [
    PatternsComponent,
    PatternCardComponent,
    PatternAddComponent
]

@NgModule({
    declarations: [
        AmstoreAdminComponent,
        MenuComponent,
        ...PAGES,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AmstoreCdkModule,
        AmstoreSharedModule,
        PatternModule
    ]
})
export class AdminModule {
}
