import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmstorePatternSendComponent } from './amstore-pattern-send.component';
import { AmstoreCdkModule } from "@am/cdk/cdk.module";


@NgModule({
    declarations: [AmstorePatternSendComponent],
    exports: [AmstorePatternSendComponent],
    imports: [
        CommonModule,
        AmstoreCdkModule
    ]
})
export class AmstorePatternSendModule {
}
