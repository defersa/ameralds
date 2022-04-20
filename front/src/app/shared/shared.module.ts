import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmstoreCdkModule } from '@am/cdk/cdk.module';

import { AmstoreViewerModule } from './viewer/viewer.module';
import { AmstoreCardModule } from './card/card.module';
import { AmstoreSnapshotModule } from './snapshot/snapshot.module';
import { AmstorePaginatedPageModule } from './paginated-page/paginated-page.module';
import { AmstorePatternSendModule } from "./pattern-send/amstore-pattern-send.module";
import { AmstoreFilterModule } from "./filter/filter.module";


const SHARED_MODULES: any[] = [
    AmstoreViewerModule,
    AmstoreCardModule,
    AmstoreSnapshotModule,
    AmstorePaginatedPageModule,
    AmstorePatternSendModule,
    AmstoreFilterModule
]

@NgModule({
    imports: [
        CommonModule,
        AmstoreCdkModule,
        ...SHARED_MODULES
    ],
    exports: SHARED_MODULES,
    declarations: []
})
export class AmstoreSharedModule {
}
