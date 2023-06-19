import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageListComponent } from './image-list.component';
import { AmstoreViewerModule } from "@am/shared/viewer/viewer.module";
import { OutsideSrcModule } from "@am/shared/outside-src/outside-src.module";


@NgModule({
    declarations: [
        ImageListComponent
    ],
    exports: [
        ImageListComponent
    ],
    imports: [
        CommonModule,
        AmstoreViewerModule,
        OutsideSrcModule,
    ]
})
export class ImageListModule {
}
