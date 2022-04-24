import { ThemePalette } from '@am/cdk/core/color';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterQuery, PaginatedPageComponent } from '@am/shared/paginated-page/paginated-page.component';
import { PageRequest, PatternMaxType, SmallPattern } from '@am/interface/pattern.interface';
import { PatternService } from '@am/shared/services/pattern.service';

@Component({
    selector: 'app-patterns',
    templateUrl: './patterns.component.html',
    styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent implements OnInit, OnDestroy {
    @ViewChild(PaginatedPageComponent)
    private _paginatedPageComponent: PaginatedPageComponent | undefined;

    public items: PatternMaxType[] = [];
    public pageCount: number = 1;
    public filters: Record<string, unknown> = {};

    protected destroyed: Subject<void> = new Subject<void>();


    constructor(
        private pattern: PatternService
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

    public nextPage(query: FilterQuery): void {
        const categories: number[] = (typeof query.categories === 'string' ? [query.categories] : query.categories as [])?.map((item: string) => Number(item)) || [];
        const sizes: number[] = (typeof query.sizes === 'string' ? [query.sizes] : query.sizes as [])?.map((item: string) => Number(item)) || [];
        this.filters = {
            search: query.search ?? '',
            categories,
            sizes
        };
        const page: number = query.page;

        this.pattern.getPatterns(page, this.filters.categories as number[], this.filters.sizes as number[], this.filters.search as string)
            .subscribe((next: PageRequest) => {
                this.pageCount = next.pageCount;
                this.items = next.items;
            });
    }

    public navigateToChild(id: number): void {
        this.pattern.goToCard(id);
    }

    public setFilter(event: Record<string, unknown>): void {
        if (this._paginatedPageComponent) {
            this._paginatedPageComponent.page = 1;
            this._paginatedPageComponent.setFilters(event);
        }
    }
}
