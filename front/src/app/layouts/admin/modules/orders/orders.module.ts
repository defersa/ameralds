import { CartComponent } from "@am/root/layouts/admin/modules/orders/cart/cart.component";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AmstoreCdkModule } from "@am/cdk/cdk.module";
import { AmstoreSharedModule } from "@am/shared/shared.module";
import { PatternModule } from "@am/shared/actions/pattern/pattern.module";
import { NgModule } from "@angular/core";
import { IndexComponent } from './index/index.component';


const routes: Routes = [
    {
        path: 'cart',
        component: CartComponent,
    },
    {
        path: 'list',
        component: IndexComponent,
    },
];

@NgModule({
    declarations: [
        CartComponent,
        IndexComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,

        AmstoreCdkModule,
        AmstoreSharedModule,
        PatternModule,
    ],
})
export class OrdersModule {

}
