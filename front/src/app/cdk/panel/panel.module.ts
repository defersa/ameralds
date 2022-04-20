import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmstorePanelComponent, AmstorePanelHeaderComponent } from './panel.component';
import { AmstoreIconModule } from "@am/cdk/icons/icons.module";
import { AmstoreDividerModule } from "@am/cdk/divider/divider.module";


@NgModule({
    declarations: [AmstorePanelComponent, AmstorePanelHeaderComponent],
    exports: [AmstorePanelComponent, AmstorePanelHeaderComponent],
    imports: [
        CommonModule,
        AmstoreIconModule,
        AmstoreDividerModule
    ]
})
export class AmstorePanelModule {
}
