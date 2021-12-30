import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmstoreViewerComponent } from './viewer.component';
import { AmstoreIconModule } from '../icons/icons.module';



@NgModule({
    declarations: [AmstoreViewerComponent],
    imports: [
        CommonModule,
        AmstoreIconModule
    ]
})
export class AmstoreViewerModule { }
