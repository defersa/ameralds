import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmstoreChipModule } from '../chip/chip.module';

import { AmstoreSnapshotBaseDirective } from './snapshot.base.directive';
import { AmstoreSnapshotPatternComponent } from './pattern/pattern.component';
import { AmstoreIconModule } from '../icons/icons.module';
import { AmstoreButtonDefaultModule } from '../buttons/default/default.module';
import { AmstoreInfoModule } from '../info/info.module';
import { AmstoreSlideModule } from '../slide/slide.module';



@NgModule({
    declarations: [AmstoreSnapshotBaseDirective, AmstoreSnapshotPatternComponent],
    imports: [
        CommonModule,
        AmstoreChipModule,
        AmstoreIconModule,
        AmstoreButtonDefaultModule,
        AmstoreInfoModule,
        AmstoreSlideModule
    ],
    exports: [
        AmstoreSnapshotPatternComponent
    ]
})
export class AmstoreSnapshotModule { }
