import { AmstoreViewerService } from '@am/cdk/viewer/viewer.service';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LangType } from 'src/app/core/language/language.component';
import { GoodsCard, GoodsModifire, ProductLite, ProductType } from 'src/app/interface/goods.intreface';
import { ImageModelSmall } from 'src/app/interface/image.interface';
import { SmallPattern } from 'src/app/interface/pattern.interface';
import { LangService } from 'src/app/services/lang.service';
import { AmstoreCardDirective } from '../card.directive';



@Component({
    selector: 'amstore-pattern-add-card',
    templateUrl: './pattern-add.component.html',
    styleUrls: ['./pattern-add.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmstorePatternAddCardComponent extends AmstoreCardDirective {
    public get mainImage(): ImageModelSmall | null {
        return this.data.images[0] || null;
    }

    public get subImages(): ImageModelSmall[] {
        return this.data.images.length ? this.data.images.slice(1)  : [];
    }
    public get images(): ImageModelSmall[] {
        return this.data.images.length ? this.data.images : [];
    }


    @Input()
    public set data(value: SmallPattern) {
        this._data = value;
    };
    public get data(): SmallPattern {
        return this._data;
    };
    private _data: SmallPattern = MOCK_PATTERN;


    private _lang: LangType = 'ru';

    protected destroyed: Subject<void> = new Subject<void>();

    constructor(public elementRef: ElementRef,
        protected viewer: AmstoreViewerService,
        private langService: LangService) {
        super(viewer);

    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }
}

const MOCK_PATTERN: SmallPattern = {
    id: 0,
    name: '',
    description: '',
    urls: '',
    price_ru: 0,
    price_en: 0,
    create_date: undefined,
    images: []
};
