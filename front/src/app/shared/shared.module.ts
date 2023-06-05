import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmstoreCdkModule } from '@am/cdk/cdk.module';

import { AmstoreViewerModule } from './viewer/viewer.module';
import { AmstoreCardModule } from './card/card.module';
import { AmstoreSnapshotModule } from './snapshot/snapshot.module';
import { AmstoreFilterModule } from "./filter/filter.module";


const SHARED_MODULES: any[] = [
    AmstoreViewerModule,
    AmstoreCardModule,
    AmstoreSnapshotModule,
    AmstoreFilterModule
]

@NgModule({
    imports: [
        CommonModule,
        AmstoreCdkModule,
        ...SHARED_MODULES
    ],
    exports: SHARED_MODULES,
})
export class AmstoreSharedModule {
}
