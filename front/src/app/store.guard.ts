import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { PermissionsService } from "@am/services/permissions.service";

@Injectable({
    providedIn: 'root'
})
export class AmstoreCanActivatePage implements CanActivate, CanActivateChild {
    constructor(private _permissions: PermissionsService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._permissions.canActivate(state.url);
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._permissions.canActivate(state.url);
    }
}
