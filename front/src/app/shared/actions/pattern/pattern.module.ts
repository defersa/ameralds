import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmstoreCdkModule } from "@am/cdk/cdk.module";

import { AbstractPatternCard } from "@am/shared/actions/pattern/pattern.abstract";

import { PatternAdminComponent } from './pattern-admin/pattern-admin.component';
import { PatternCartComponent } from './pattern-cart/pattern-cart.component';
import { PatternDownloadComponent } from './pattern-download/pattern-download.component';


@NgModule({
    declarations: [
        AbstractPatternCard,
        PatternAdminComponent,
        PatternCartComponent,
        PatternDownloadComponent
    ],
    exports: [
        PatternAdminComponent,
        PatternCartComponent,
        PatternDownloadComponent
    ],
    imports: [
        CommonModule,
        AmstoreCdkModule
    ]
})
export class PatternModule {
}
