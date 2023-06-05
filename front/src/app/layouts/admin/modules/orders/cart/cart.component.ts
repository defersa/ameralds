import { Component } from '@angular/core';
import { AdminOrderService } from "@am/services/admin-order.service";
import { IAdminCart, IPatternPurchase } from "@am/interface/order.interface";
import { switchMap, take } from "rxjs/operators";
import { Observable } from "rxjs";
import { PatternService } from "@am/services/pattern.service";
import { IPattern } from "@am/interface/pattern.interface";


@Component({
    selector: 'admin-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    public patterns$: Observable<IPattern[]> = this.adminOrder.order$
        .pipe(
            take(1),
            switchMap((order: IAdminCart) => this.patternService.getPatternsByIds(order.purchases.map((item: IPatternPurchase) => item.pattern)))
        );

    constructor(
        private adminOrder: AdminOrderService,
        private patternService: PatternService,
    ) {
    }

}
