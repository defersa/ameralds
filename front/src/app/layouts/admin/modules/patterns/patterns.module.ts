import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AmstoreCdkModule } from "@am/cdk/cdk.module";
import { AmstoreSharedModule } from "@am/shared/shared.module";
import { NgModule } from "@angular/core";
import { PatternsComponent } from "./index/patterns.component";
import { PatternCardComponent } from "./card/pattern-card.component";
import { PatternAddComponent } from "./edit/pattern-add.component";
import { PatternModule } from "@am/shared/actions/pattern/pattern.module";


const routes: Routes = [
    {
        path: '',
        component: PatternsComponent,
    },
    {
        path: 'card/:id',
        component: PatternCardComponent
    },
    {
        path: 'create',
        component: PatternAddComponent,
    },
    {
        path: 'edit/:id',
        component: PatternAddComponent,
    },
];

@NgModule({
    declarations: [
        PatternsComponent,
        PatternCardComponent,
        PatternAddComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,

        AmstoreCdkModule,
        AmstoreSharedModule,
        PatternModule,
    ],
})
export class PatternsModule {

}
