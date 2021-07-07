import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { FilterQuery } from 'src/app/components/paginated-page/paginated-page.component';
import { OrdersRequest, SmallOrders } from 'src/app/interface/order.interface';
import { OrdersService } from '../../services/orders.service';

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

    public page: number = 1;
    public pageCount: number = 1;
    public orders: SmallOrders[] = [];


    constructor(
        private ordersService: OrdersService
    ) { }

    public ngOnInit(): void {
    }

    public nextPage(query: FilterQuery): void {
        this.ordersService.getOrders(query.page).
            pipe(tap((next: OrdersRequest) => {
                this.pageCount = next.pageCount;
                this.page = next.page;
            })).subscribe((next: OrdersRequest) =>
                this.orders = next.orders);
    }
}
