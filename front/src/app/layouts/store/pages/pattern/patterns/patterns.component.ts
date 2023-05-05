import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedPageComponent } from '@am/shared/paginated-page/paginated-page.component';
import { PageRequest, PatternMaxType, SmallPattern } from '@am/interface/pattern.interface';
import { PatternService } from '@am/shared/services/pattern.service';
import { FilteredPage, FiltersSet } from "@am/shared/abstract/filtered-page";
import { filter, map, switchMap } from "rxjs/operators";
import { Params } from "@angular/router";
import { DestroySubject } from "@am/utils/destroy.service";


@Component({
    selector: 'app-patterns',
    templateUrl: './patterns.component.html',
    styleUrls: ['./patterns.component.scss'],
    providers: [DestroySubject],
})
export class PatternsComponent extends FilteredPage {
    @ViewChild(PaginatedPageComponent)
    private _paginatedPageComponent: PaginatedPageComponent | undefined;

    public items$: Observable<PatternMaxType[]> = this.filterSet$.pipe(
        filter((result: FiltersSet) => !!result),
        map((result: FiltersSet) => {
            this.page = Number(result['page']) || 1;

            return {
                ...result,
                page: this.page,
            };
        }),
        switchMap((variables: Params) => this.pattern.getPatterns(variables)),
        map((result: PageRequest) => {
                this.pageCount = result.pageCount;
                return result.items;
            }
        ));


    public pageCount: number = 1;
    public page: number;
    public filters: Record<string, unknown>;


    constructor(
        private pattern: PatternService
    ) {
        super();
    }

    public setFilterWithPage(filters: Record<string, unknown>): void {
        this.setFilter({
            ...filters,
            page: 1,
        });
    }

    protected initFilters(query: Params): FiltersSet {
        const categories: number[] =
            (typeof query['categories'] === 'string' ? [query['categories']] : query['categories'] as [])
            ?.map(Number) || [];

        const sizes: number[] =
            (typeof query['sizes'] === 'string' ? [query['sizes']] : query['sizes'] as [])
            ?.map(Number) || [];

        this.filters = {
            search: query['search'] ?? '',
            categories,
            sizes
        };

        this.page = Number(query['page']) || 1;

        console.log(query['categories'])

        return {
            ...this.filters,
            page: query['page']
        };
    }
}
