import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmstoreViewerComponent } from './viewer.component';
import { AmstoreIconModule } from '../icons/icons.module';
import { AmstoreImagesEditComponent } from './edit/edit.component';
import { AmstoreButtonDefaultModule } from '../buttons/default/default.module';
import { AmstorePaginatorModule } from '../paginator/paginator.module';



@NgModule({
    declarations: [AmstoreViewerComponent, AmstoreImagesEditComponent],
    imports: [
        CommonModule,
        AmstoreIconModule,
        AmstoreButtonDefaultModule,
        AmstorePaginatorModule
    ]
})
export class AmstoreViewerModule { }
