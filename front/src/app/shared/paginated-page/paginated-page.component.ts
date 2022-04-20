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

    public page: number = 1;

    public _filters: Record<string, unknown> = {};

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
    ) {
    }

    public ngOnInit(): void {
        this.initQuerySubscribe();
    }

    public ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

    public setPage(page: number): void {
        this.page = page;
        this.setQueryParams();
    }

    public setFilters(filters: Record<string, unknown>): void {
        this._filters = filters;
        this.setQueryParams();
    }

    public setQueryParams(): void {
        this.queryParams = { page: this.page, ...this._filters};
        this.router.navigate([], {
            relativeTo: this.activateRoute,
            queryParams: this.queryParams,
            queryParamsHandling: '',
            skipLocationChange: false
        })
    }

    public initQuerySubscribe(): void {
        this.activateRoute.queryParams?.pipe(
            takeUntil(this.destroyed)
        ).subscribe((params: Params) => {
            this.queryParams = params;

            this._updateFilterStateByQueryEvent(params);
            this.page = params.page ? Number(params.page) : 1;

            const filter: FilterQuery = {
                ...this._filters,
                page: this.page
            };

            this.queryEvent.emit(filter)
        });
    }

    private _updateFilterStateByQueryEvent(params: Params): void {
        const filters: Record<string, unknown> = {...params};
        if ('page' in filters) {
            delete filters.page;
        }
        this._filters = filters;
    }

}
