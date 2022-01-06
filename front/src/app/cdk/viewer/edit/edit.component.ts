import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ImageModel, ImageModelRequest, ImageModelSmall } from 'src/app/interface/image.interface';
import { ImagesService } from 'src/app/layouts/store/services/images.service';
import { MapImageFull } from 'src/app/layouts/store/utils/images';

@Component({
    selector: 'amstore-images-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class AmstoreImagesEditComponent implements OnInit {

    public selectedImages: ImageModelSmall[];


    public set imageList(value: ImageModel[]) {
        this._imageList = value;
        this._updateImagesList();
    }
    public get imageList(): ImageModel[] {
        return this._imageList;
    }
    private _imageList: ImageModel[] = [];

    public imageList$: BehaviorSubject<ImageModel[]> = new BehaviorSubject<ImageModel[]>([]);


    public page: number = 1;
    public pageCount: number = 1;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: { images: ImageModelSmall[] },
        private imagesService: ImagesService,
        private _dialogRef: MatDialogRef<unknown>) {
        this.selectedImages = this.data.images;
    }

    public ngOnInit(): void {
        this.goToPage(this.page);
    }

    public goToPage(page: number): void {
        this.imagesService.getImages(String(page))
            .subscribe((data: ImageModelRequest) => {
                this.page = data.page;
                this.pageCount = data.pageCount;
                this.imageList = data.images.map(MapImageFull);
            });
    }

    public previousPosition(i: number): void {
        if (i === 0) {
            return;
        }
        [this.selectedImages[i - 1], this.selectedImages[i]] = [this.selectedImages[i], this.selectedImages[i - 1]];
    }

    public nextPosition(i: number): void {
        if (i === this.selectedImages.length - 1) {
            return;
        }
        [this.selectedImages[i + 1], this.selectedImages[i]] = [this.selectedImages[i], this.selectedImages[i + 1]];
    }
    public addImage(image: ImageModel): void {
        this.selectedImages.push(image);
        this._updateImagesList();
    }

    public removeImage(i: number): void {
        this.selectedImages.splice(i, 1);
        this._updateImagesList();
    }

    public close(): void {
        this._dialogRef.close();
    }

    public save(): void {
        this._dialogRef.close(this.selectedImages);
    }

    private _updateImagesList(): void {
        this.imageList$.next(
            this.imageList.map((item: ImageModel) =>
                ({ ...item, select: Boolean(this.selectedImages.find((image: ImageModelSmall) => image.id === item.id)) })));
    }
}
