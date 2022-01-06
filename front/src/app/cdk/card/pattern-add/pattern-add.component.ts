import { AmstoreViewerService } from '@am/cdk/viewer/viewer.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LangType } from 'src/app/core/language/language.component';
import { GoodsCard, GoodsModifire, ProductLite, ProductType } from 'src/app/interface/goods.intreface';
import { ImageModelSmall } from 'src/app/interface/image.interface';
import { PatternType, SmallPattern } from 'src/app/interface/pattern.interface';
import { AmstoreCardDirective } from '../card.directive';



@Component({
    selector: 'amstore-pattern-add-card',
    templateUrl: './pattern-add.component.html',
    styleUrls: ['./pattern-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmstorePatternAddCardComponent extends AmstoreCardDirective {
    public get mainImage(): ImageModelSmall | null {
        return this._images[0] || null;
    }

    public get subImages(): ImageModelSmall[] {
        return this._images.length ? this._images.slice(1) : [];
    }
    public get images(): ImageModelSmall[] {
        return this._images.length ? this._images : [];
    }
    public _images: ImageModelSmall[] = [];



    @Input()
    public set data(value: PatternType) {
        this._data = value;
        this._images = this.data.images;
    };
    public get data(): PatternType {
        return this._data;
    };
    private _data: PatternType;


    private _lang: LangType = 'ru';

    protected destroyed: Subject<void> = new Subject<void>();

    constructor(public elementRef: ElementRef,
        private _changeDetector: ChangeDetectorRef,
        protected viewer: AmstoreViewerService) {
        super(viewer);

    }

    public ngOnInit(): void {
        this.openImagesEdit();
    }

    public ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }
    public openImagesEdit(): void {
        this.viewer.openEdit(this.images)
            .subscribe((images: false | ImageModelSmall[]) => {
                if (!images) {
                    return;
                }
                console.log(images);
                this._images = images;
                this._changeDetector.markForCheck();
            });
    }
}

