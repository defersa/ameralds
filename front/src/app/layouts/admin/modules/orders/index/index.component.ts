import { Component, inject } from '@angular/core';
import { AdminOrderService } from "@am/services/admin-order.service";
import { FilteredPage, FiltersSet } from "@am/shared/abstract/filtered-page";
import { Observable } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { Params } from "@angular/router";
import { IPaginatedResponse } from "@am/interface/request.interface";
import { IAdminOrder } from "@am/interface/order.interface";
import { DestroyService } from "@am/utils/destroy.service";


@Component({
    selector: 'admin-orders-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
    providers: [DestroyService],
})
export class IndexComponent extends FilteredPage {
    public items$: Observable<IAdminOrder[]> = this.filterSet$.pipe(
        filter((result: FiltersSet) => !!result),
        map((result: FiltersSet) => {
            this.page = Number(result['page']) || 1;

            return {
                ...result,
                page: this.page,
            };
        }),
        switchMap((variables: Params) => this.adminOrder.getOrders(variables)),
        map((result: IPaginatedResponse<IAdminOrder>) => {
                this.pageCount = result.pageCount;
                return result.items;
            }
        ));


    public pageCount: number = 1;
    public page: number;
    public filters: Record<string, unknown> = {};

    protected adminOrder: AdminOrderService = inject(AdminOrderService);

    public setFilterWithPage(filters: Record<string, unknown>): void {
        this.setFilter({
            ...filters,
            page: 1,
        });
    }

    protected initFilters(query: Params): FiltersSet {
        // const categories: number[] =
        //     (typeof query['categories'] === 'string' ? [query['categories']] : query['categories'] as [])
        //     ?.map(Number) || [];
        //
        // const sizes: number[] =
        //     (typeof query['sizes'] === 'string' ? [query['sizes']] : query['sizes'] as [])
        //     ?.map(Number) || [];
        //
        // this.filters = {
        //     search: query['search'] ?? '',
        //     categories,
        //     sizes
        // };

        this.page = Number(query['page']) || 1;

        return {
            ...this.filters,
            page: query['page']
        };
    }

}
