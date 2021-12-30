import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedPageComponent } from './paginated-page.component';
import { AmstoreCdkModule } from '@am/cdk/cdk.module';



@NgModule({
    declarations: [PaginatedPageComponent],
    exports: [PaginatedPageComponent],
    imports: [
        CommonModule,
        AmstoreCdkModule
    ]
})
export class PaginatedPageModule { }
