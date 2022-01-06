import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AmstoreImagesEditComponent } from './edit/edit.component';
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
    
    public openEdit(images: unknown[]): Observable<any> {
        return this._dialog.open( AmstoreImagesEditComponent, {
            data: {
                images
            },
            width: '90vw',
            hasBackdrop: true
        }).afterClosed();
    }
}
