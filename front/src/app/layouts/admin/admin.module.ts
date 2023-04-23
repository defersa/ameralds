import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmstoreAdminComponent } from './admin.component';
import { RouterModule, Routes } from "@angular/router";
import { AmstoreCdkModule } from "@am/cdk/cdk.module";
import { AmstoreSharedModule } from "@am/shared/shared.module";
import { PatternsComponent } from "@am/root/layouts/admin/pages/pattern/patterns/patterns.component";
import { PatternCardComponent } from "@am/root/layouts/admin/pages/pattern/pattern-card/pattern-card.component";
import { PatternAddComponent } from "@am/root/layouts/admin/pages/pattern/pattern-add/pattern-add.component";
import { PatternModule } from "@am/shared/actions/pattern/pattern.module";
import { MenuModule } from "@am/shared/menu/menu.module";
import { AMSTORE_SECTION_CONFIG } from "@am/shared/menu/menu.component";
import { adminConfig } from "@am/root/layouts/admin/section.config";


export const routes: Routes = [{
    path: '',
    component: AmstoreAdminComponent,
    children: [
        {
            path: '',
            redirectTo: 'patterns',
        },
        {
            path: 'patterns',
            component: PatternsComponent,
        },
        {
            path: 'pattern-card/:id',
            component: PatternCardComponent
        },
        {
            path: 'pattern-add',
            component: PatternAddComponent,
        },
        {
            path: 'pattern-edit/:id',
            component: PatternAddComponent,
        },
        {
            path: 'sizes',
            loadChildren: () => import('./modules/sizes/sizes.module').then(m => m.SizesModule),
        },
        {
            path: 'categories',
            loadChildren: () => import('./modules/categories/categories.module').then(m => m.CategoriesModule),
        }
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
        ...PAGES,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        AmstoreCdkModule,
        AmstoreSharedModule,
        PatternModule,
        MenuModule,
    ],
    providers: [
        { provide: AMSTORE_SECTION_CONFIG, useValue: adminConfig},
    ]
})
export class AdminModule {
}
