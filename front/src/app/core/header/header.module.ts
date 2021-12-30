import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmstoreCdkModule } from '@am/cdk/cdk.module';

import { HeaderComponent } from './header.component';



@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        AmstoreCdkModule
    ],
    exports: [HeaderComponent]
})
export class AmstoreHeaderModule { }
