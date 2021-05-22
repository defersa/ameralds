import { Component, Input, OnInit } from '@angular/core';
import { ImageModelSmall } from 'src/app/interface/image.interface';

@Component({
    selector: 'amstore-images-preview',
    templateUrl: './images-preview.component.html',
    styleUrls: ['./images-preview.component.scss']
})
export class ImagesPreviewComponent implements OnInit {

    @Input()
    public get images(): ImageModelSmall[] {
        return this._images;
    }

    public set images(value: ImageModelSmall[]) {
        this._images = value.length ? value : [{
            id: 0,
            image_full: 'assets/no-image.jpg',
            image_small: 'assets/no-image.jpg'
        }];
        this.imageCount = this._images.length;
        this.current = 0;
    }
    private _images: ImageModelSmall[] = [];

    public get currentImage(): ImageModelSmall {
        return this._images[this.current];
    }


    public imageCount: number = 0;
    public current: number = 0;

    constructor() { }

    public onSwitchCurrent(next: number): void {
        this.current = next;
    }

    ngOnInit(): void {
    }

}
