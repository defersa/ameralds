import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmstoreCdkModule } from '@am/cdk/cdk.module';

import { HeaderComponent } from './header.component';
import { RouterModule } from "@angular/router";



@NgModule({
    declarations: [HeaderComponent],
    imports: [
        CommonModule,
        AmstoreCdkModule,
        RouterModule
    ],
    exports: [HeaderComponent]
})
export class AmstoreHeaderModule { }
