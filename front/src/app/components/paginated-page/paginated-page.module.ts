import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatedPageComponent } from './paginated-page.component';
import { PaginatorModule } from '../paginator/paginator.module';



@NgModule({
    declarations: [PaginatedPageComponent],
    exports: [PaginatedPageComponent],
    imports: [
        CommonModule,
        PaginatorModule
    ]
})
export class PaginatedPageModule { }
