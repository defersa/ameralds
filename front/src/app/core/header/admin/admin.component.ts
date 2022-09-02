import { Component, OnInit } from '@angular/core';
import { Subject } from "rxjs";
import { GoodsService } from "@am/services/goods.service";
import { AdminRoutes, SectionEnum } from "@am/utils/router-builder";
import { RouterService } from "@am/services/router.service";

@Component({
    selector: 'amstore-header-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AmstoreHeaderAdminComponent implements OnInit {
    public linkToAdmin: string[] = this._navigation.generateLink(SectionEnum.Admin, AdminRoutes.Patterns);

    public get goodsCount(): Subject<number> {
        return this.goodsService.goodsCount;
    }
    public get goodsPrice(): Subject<number> {
        return this.goodsService.goodsPrice;
    }

    constructor(
        private goodsService: GoodsService,
        private _navigation: RouterService
    ) { }

    ngOnInit(): void {
    }

}
