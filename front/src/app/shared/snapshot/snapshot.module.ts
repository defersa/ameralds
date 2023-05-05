import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmstoreChipModule } from '@am/cdk/chip/chip.module';

import { AmstoreSnapshotBaseDirective } from './snapshot.base.directive';
import { AmstoreSnapshotPatternComponent } from './pattern/pattern.component';
import { AmstoreIconModule } from '@am/cdk/icons/icons.module';
import { AmstoreButtonDefaultModule } from '@am/cdk/buttons/default/default.module';
import { AmstoreInfoModule } from '@am/cdk/info/info.module';
import { AmstoreSlideModule } from '@am/cdk/slide/slide.module';
import { RouterModule } from "@angular/router";



@NgModule({
    declarations: [AmstoreSnapshotBaseDirective, AmstoreSnapshotPatternComponent],
    imports: [
        CommonModule,
        AmstoreChipModule,
        AmstoreIconModule,
        AmstoreButtonDefaultModule,
        AmstoreInfoModule,
        AmstoreSlideModule,
        RouterModule,
    ],
    exports: [
        AmstoreSnapshotPatternComponent
    ]
})
export class AmstoreSnapshotModule { }
