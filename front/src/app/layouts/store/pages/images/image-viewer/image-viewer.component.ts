import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageModelSmall } from 'src/app/interface/image.interface';

@Component({
    selector: 'amstore-image-viewer',
    templateUrl: './image-viewer.component.html',
    styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {

    @Output()
    public deleteItem: EventEmitter<ImageModelSmall> = new EventEmitter<ImageModelSmall>()

    @Input()
    public image: ImageModelSmall = {
        id: 0,
        image_full: '',
        image_small: ''
    };

    constructor() { }

    ngOnInit(): void {
    }

    public onDeleteImage(): void {
        this.deleteItem.emit(this.image)
    }
}
