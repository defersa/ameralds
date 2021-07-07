import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export type FilterQuery = {
    page: number;
    [key: string]: unknown;
}

@Component({
    selector: 'amstore-paginated-page',
    templateUrl: './paginated-page.component.html',
    styleUrls: ['./paginated-page.component.scss']
})
export class PaginatedPageComponent implements OnInit, OnDestroy {
    @Input()
    public pageCount: number = 1;
    
    @Input()
    public page: number = 1;

    @Output()
    public queryEvent: EventEmitter<FilterQuery> = new EventEmitter<FilterQuery>();

    public get queryParams(): Params | null {
        return this._queryParams;
    }

    public set queryParams(value: Params | null) {
        this._queryParams = value;
    }

    private _queryParams: Params | null = null;

    protected destroyed: Subject<void> = new Subject<void>();

    constructor(
        private activateRoute: ActivatedRoute,
        private router: Router
        ) { }

    public ngOnInit(): void {
        this.initQuerySubscribe();
    }

    public ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

    public setQueryParams(page: number): void {
        this.queryParams = { page };
        this.router.navigate([], {
            relativeTo: this.activateRoute,
            queryParams: this.queryParams,
            queryParamsHandling: 'merge',
            skipLocationChange: false
        })
    }

    public initQuerySubscribe(): void {
        this.activateRoute.queryParams?.pipe(
            takeUntil(this.destroyed)
        ).subscribe((params: Params) => {
            this.queryParams = params;
            const filter: FilterQuery = {
                page: params.page ? params.page : 1
            };
            this.queryEvent.emit(filter)
        });
    }

}
