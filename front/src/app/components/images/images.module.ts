import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesPreviewComponent } from './images-preview/images-preview.component';



@NgModule({
    declarations: [ImagesPreviewComponent],
    imports: [
        CommonModule
    ],
    exports: [
        ImagesPreviewComponent
    ]
})
export class ImagesModule { }
