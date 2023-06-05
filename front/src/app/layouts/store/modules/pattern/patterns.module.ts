import { NgModule } from "@angular/core";
import { PatternsComponent } from "./patterns/patterns.component";
import { PatternCardComponent } from "./pattern-card/pattern-card.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AmstoreCdkModule } from "@am/cdk/cdk.module";
import { AmstoreSharedModule } from "@am/shared/shared.module";


export const routes: Routes = [
    {
        path: '',
        component: PatternsComponent,
    },
    {
        path: ':id',
        component: PatternCardComponent,
    },
]

@NgModule({
    declarations: [
        PatternsComponent,
        PatternCardComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,

        AmstoreCdkModule,
        AmstoreSharedModule,
    ],
})
export class PatternsStoreModule {

}
