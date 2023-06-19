import { Component } from '@angular/core';
import { AdminOrderService } from "@am/services/admin-order.service";
import { IAdminCart, IPatternPurchase } from "@am/interface/order.interface";
import { switchMap, take } from "rxjs/operators";
import { Observable } from "rxjs";
import { PatternService } from "@am/services/pattern.service";
import { IPattern } from "@am/interface/pattern.interface";
import { FormControl, Validators } from "@angular/forms";


@Component({
    selector: 'admin-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
})
export class CartComponent {
    public order$: Observable<IAdminCart> = this.adminOrder.order$;
    public patterns$: Observable<IPattern[]> = this.order$
        .pipe(
            take(1),
            switchMap((order: IAdminCart) => this.patternService.getPatternsByIds(order.purchases.map((item: IPatternPurchase) => item.pattern)))
        );

    public emailControl: FormControl = new FormControl('', [Validators.required, Validators.email]);

    constructor(
        private adminOrder: AdminOrderService,
        private patternService: PatternService,
    ) {
    }

    public sendOrder(order: IAdminCart): void {
        this.adminOrder.sendOrder({
            email: this.emailControl.value,
            order,
        }).subscribe((result) => console.log(result));
    }
}
