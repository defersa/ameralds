import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AmstoreViewerComponent } from './viewer.component';

@Injectable({
    providedIn: 'root'
})
export class AmstoreViewerService {

    constructor(
        private _dialog: MatDialog) { }

    public open(images: unknown[], index: number) : void {
        this._dialog.open( AmstoreViewerComponent, {
            data: {
                images,
                index
            },
            width: '80vw',
            hasBackdrop: true
        });
    }
}
