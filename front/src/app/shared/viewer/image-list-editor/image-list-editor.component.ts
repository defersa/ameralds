import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ImageType } from "@am/interface/image.interface";

export type IndexedImage = { image: ImageType; index: number; };
export type IndexedBlob = { image: File; src: string; index: number; };

@Component({
    selector: 'amstore-image-list-editor',
    templateUrl: './image-list-editor.component.html',
    styleUrls: ['./image-list-editor.component.scss'],
    host: {
        'class': 'amstore-image-list-editor'
    }
})
export class AmstoreImageListEditorComponent implements OnInit {
    @ViewChild('imageInput')
    private imageInputRef: ElementRef | undefined;

    public currentImages: IndexedImage[] = [];
    public blobImages: IndexedBlob[] = [];

    public removedImages: ImageType[] = [];

    private get imagesLength(): number {
        return this.currentImages.length + this.blobImages.length;
    }

    private _fileReader: FileReader = new FileReader();
    private _file: globalThis.File | null = null;

    constructor(@Inject(MAT_DIALOG_DATA) public data: { currentImages: IndexedImage[], blobImages: IndexedBlob[] },
                private _dialogRef: MatDialogRef<unknown>) {
        this.currentImages = this.data.currentImages;
        this.blobImages = this.data.blobImages;
    }

    public ngOnInit(): void {
        this._initFileReader();
    }

    public dropFiles(fileList: EventTarget | null): void {
        const files: FileList | null = fileList ? (fileList as HTMLInputElement).files : null;
        const file: globalThis.File | null | undefined = files ? files.item(0) : undefined;

        if (file) {
            this._file = file;
            this._fileReader.readAsDataURL(file as unknown as Blob);
        }
    }

    public moveImage(image: IndexedBlob | IndexedImage, direction: 'next' | 'prev'): void {
        const currentIndex: number = image.index;
        let newIndex: number = image.index + (this.imagesLength === image.index ? 0 : 1);

        if (direction === 'prev') {
            newIndex = image.index - (0 === image.index ? 0 : 1);
        }

        if (newIndex === currentIndex) {
            return;
        }

        const shiftedImage: IndexedBlob | IndexedImage | undefined = this.currentImages.find((item: IndexedImage) => item.index === newIndex) ||
            this.blobImages.find((item: IndexedBlob) => item.index === newIndex);

        if (shiftedImage) {
            shiftedImage.index = currentIndex;
            image.index = newIndex;
        }
    }

    public removeBlobImage(image: IndexedBlob): void {
        const index: number = image.index;

        this.blobImages = this.blobImages.filter((item: IndexedBlob) => item !== image);

        this._updateOrderAtIndex(index);
    }

    public removeDownloadImage(image: IndexedImage): void {
        const index: number = image.index;

        this.currentImages = this.currentImages.filter((item: IndexedImage) => item !== image);
        this.removedImages.push(image.image);

        this._updateOrderAtIndex(index);
    }

    public revertImage(image: ImageType): void {
        this.removedImages = this.removedImages.filter((item: ImageType) => item !== image);
        this.currentImages.push({image, index: this.imagesLength});
    }

    public callInputDialog(): void {
        ((this.imageInputRef as ElementRef).nativeElement as HTMLBaseElement).click();
    }

    public close(save?: boolean): void {
        this._dialogRef.close(save ? [this.currentImages, this.blobImages] : null);
    }

    private _updateOrderAtIndex(index: number): void {
        [...this.blobImages, ...this.currentImages]
            .forEach((image: IndexedBlob | IndexedImage) => image.index = image.index - (image.index > index ? 1 : 0));
    }

    private _initFileReader(): void {
        this._fileReader.onload = () => {
            const index: number = this.imagesLength;
            this.blobImages.push({image: this._file as unknown as File, index, src: this._fileReader.result as string});
        }
    }
}
