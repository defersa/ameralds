import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ImageAddRequest, ImageModel, ImageModelRequest, ImageModelSmall } from 'src/app/interface/image.interface';
import { ResultRequest } from 'src/app/interface/request.interface';
import { ImagesService } from '../../services/images.service';
import { MapImageFull } from '../../utils/images';


@Component({
    selector: 'amstore-images',
    templateUrl: './images.component.html',
    styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

    @ViewChild('imageInput')
    private imageInputRef: ElementRef | undefined;

    @ViewChild('uploadImage')
    private uploadImageRef: ElementRef | undefined;

    @Output()
    public selectItem: EventEmitter<ImageModel> = new EventEmitter<ImageModel>();

    @Output()
    public deleteItem: EventEmitter<ImageModelSmall> = new EventEmitter<ImageModelSmall>()

    @Input()
    public showCheckbox: boolean = false;

    @Input()
    public set selectImageList(value: ImageModelSmall[]) {
        this._selectImageList = value;
        this.updateImagesList();
    }
    public get selectImageList(): ImageModelSmall[] {
        return this._selectImageList;
    }
    private _selectImageList: ImageModelSmall[] = [];


    public set imageList(value: ImageModel[]) {
        this._imageList = value;
        this.updateImagesList();
    }
    public get imageList(): ImageModel[] {
        return this._imageList;
    }
    private _imageList: ImageModel[] = [];

    public imageList$: BehaviorSubject<ImageModel[]> = new BehaviorSubject<ImageModel[]>([]);


    public page: number = 1;
    public pageCount: number = 1;

    constructor(private imagesService: ImagesService) {

    }

    private updateImagesList(): void {
        this.imageList$.next(
            this.imageList.map((item: ImageModel) =>
                ({ ...item, select: Boolean(this.selectImageList.find((image: ImageModelSmall) => image.id === item.id)) })));
    }

    public ngOnInit(): void {
        this.goToPage(this.page);
    }

    public callInputDialog(): void {
        ((this.imageInputRef as ElementRef).nativeElement as HTMLBaseElement).click();
    }

    public file: File | null = null;

    public upload(): void {
        if (!this.file) return;

        this.imagesService.uploadImages(this.file)
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

    public deleteImage(image: ImageModelSmall): void {
        this.imagesService.deleteImage(image.id)
            .subscribe((result: ResultRequest) => {
                if (result.result) {
                    this.imageList = this.imageList.filter((item: ImageModelSmall) => item.id !== image.id);
                    this.deleteItem.emit(image);
                }
            });
    }

    public select(image: ImageModel): void {
        this.selectItem.emit({
            ...image,
            select: undefined
        });
    }

    public dropFiles(fileList: EventTarget | null): void {
        const files: FileList | null = fileList ? (fileList as HTMLInputElement).files : null;
        this.file = files?.length ? files[0] : null;
        this.setUploadImage();
    }

    public goToPage(page: number): void {
        this.imagesService.getImages(String(page))
            .subscribe((data: ImageModelRequest) => {
                console.log(data);
                this.page = data.page;
                this.pageCount = data.pageCount;
                this.imageList = data.images.map(MapImageFull);
            });
    }
}
