import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { RouterModule, Routes } from '@angular/router';
import { JewelryComponent } from './pages/jewelry/jewelry.component';
import { JewelryCardComponent } from './pages/jewelry-card/jewelry-card.component';
import { PatternsComponent } from './pages/pattern/patterns/patterns.component';
import { PatternCardComponent } from './pages/pattern/pattern-card/pattern-card.component';
import { PatternAddComponent } from './pages/pattern/pattern-add/pattern-add.component';
import { AmstoreCdkModule } from '@am/cdk/cdk.module';
import { AmstoreSharedModule } from '@am/shared/shared.module';
import { AMSTORE_SECTION_CONFIG } from "@am/shared/menu/menu.component";
import { shopConfig } from "@am/root/layouts/store/section.config";
import { MenuModule } from "@am/shared/menu/menu.module";


export const routes: Routes = [{
    path: '',
    component: StoreComponent,
    children: [
        {
            path: '',
            redirectTo: 'patterns',
            pathMatch: "full",
        },
        {
            path: 'patterns',
            component: PatternsComponent,
            // matcher: ,
        },
        {
            path: 'pattern-card/:id',
            component: PatternCardComponent,
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
            path: 'jewelrys',
            component: JewelryComponent,
        },
    ]
}]

@NgModule({
    declarations: [
        StoreComponent,
        JewelryComponent,
        JewelryCardComponent,
        PatternsComponent,
        PatternCardComponent,
        PatternAddComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,

        AmstoreCdkModule,
        AmstoreSharedModule,
        MenuModule,
    ],
    providers: [
        { provide: AMSTORE_SECTION_CONFIG, useValue: shopConfig},
    ]
})
export class StoreModule { }
