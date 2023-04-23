import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { ImageAddRequest, ImageModel, ImageModelRequest, ImageModelSmall } from 'src/app/interface/image.interface';
import { ResultRequest } from 'src/app/interface/request.interface';
import { ImagesService } from 'src/app/shared/services/images.service';
import { MapImageFull } from 'src/app/layouts/store/utils/images';

@Component({
    selector: 'amstore-images-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class AmstoreImagesEditComponent implements OnInit {
    @ViewChild('imageInput')
    private imageInputRef: ElementRef | undefined;

    @ViewChild('uploadImage')
    private uploadImageRef: ElementRef | undefined;

    public file: File | null = null;

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

    // Upload Image chapter
    public upload(): void {
        if (!this.file) return;

        this.imagesService.uploadImage(this.file)
            .subscribe((result: ImageAddRequest) => {
                const uploadImageElem = ((this.uploadImageRef as ElementRef).nativeElement as HTMLImageElement);
                uploadImageElem.src = '';
                this.file = null;

                this.imageList = [MapImageFull(result.image), ...this.imageList];
            });
    }

    public setUploadImage(): void {
        const uploadImageElem = ((this.uploadImageRef as ElementRef).nativeElement as HTMLImageElement);

        if (FileReader && this.file) {
            const fileReader = new FileReader();

            fileReader.onload = function () {
                uploadImageElem.src = fileReader.result as string;
            }

            fileReader.readAsDataURL(this.file);
        }
    }

    public dropFiles(fileList: EventTarget | null): void {
        const files: FileList | null = fileList ? (fileList as HTMLInputElement).files : null;
        this.file = files?.length ? files[0] : null;
        this.setUploadImage();
    }

    public callInputDialog(): void {
        ((this.imageInputRef as ElementRef).nativeElement as HTMLBaseElement).click();
    }

    public deleteImage(image: ImageModelSmall): void {
        this.imagesService.deleteImage(image.id)
            .subscribe((result: ResultRequest) => {
                if (result.result) {
                    this.imageList = this.imageList.filter((item: ImageModelSmall) => item.id !== image.id);
                }
            });
    }


}
