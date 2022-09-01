import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router, RouterEvent } from "@angular/router";
import { AdminRoutes, SectionEnum } from "@am/utils/router-builder";

@Injectable({
    providedIn: 'root'
})
export class NavigatorService {

    public get queryParams(): Params | null {
        return this._queryParams;
    }

    public set queryParams(value: Params | null) {
        this._queryParams = value;
    }

    private _queryParams: Params | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    public getBack(): void {
        this.router.navigate([SectionEnum.Admin, AdminRoutes.Patterns], {
            relativeTo: this.route,
            queryParams: this.queryParams,
            skipLocationChange: false
        })
    }

    public goToEdit(id: number): Promise<boolean> {
        return this.router.navigate([SectionEnum.Admin, AdminRoutes.PatternEdit, id], {
            relativeTo: this.route,
            queryParams: this.queryParams,
            skipLocationChange: false
        })
    }

    public goToCard(id: number): void {
        this.router.navigate([SectionEnum.Admin, AdminRoutes.PatternCard, id], {
            relativeTo: this.route,
            queryParams: this.queryParams,
            skipLocationChange: false
        })
    }

}
