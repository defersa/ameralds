import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { AmstoreColor } from '../core/color';

const PAGES_AROUND: number = 4;

@Component({
    selector: 'amstore-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'amstore-paginator'
    }
})
export class AmstorePaginatorComponent extends AmstoreColor {

    @Input()
    public get page(): number {
        return this._page;
    }

    public set page(value: number) {
        this._page = value;
        this.setPageList();
    }

    public _page: number = 1;


    @Input()
    public get pageCount(): number {
        return this._pageCount;
    };

    public set pageCount(value: number) {
        this._pageCount = value;
        this.setPageList();
    };

    private _pageCount: number = 1;


    public pageList: number[] = [];

    @Output()
    public goToPageEvent: EventEmitter<number> = new EventEmitter<number>();

    constructor(public elementRef: ElementRef) {
        super(elementRef)
    }

    ngOnInit(): void {
    }

    public goToPage(page: number): void {
        this.page = page;
        this.goToPageEvent.emit(page);
    }

    public setPageList(): void {
        this.pageList = [];
        this.pageList.push(
            ...Array.from(Array(PAGES_AROUND))
                .map((item: null, index: number) => this.page - PAGES_AROUND + index)
                .filter((item: number) => item > 0));

        this.pageList.push(
            ...Array.from(Array(PAGES_AROUND + 1))
                .map((item: null, index: number) => this.page + index)
                .filter((item: number) => item <= this.pageCount));

    }
}
