import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { from, Observable } from "rxjs";
import {
    AmstoreRouteEnum,
    SectionEnum,
} from "@am/utils/router-builder";

@Injectable({
    providedIn: 'root'
})
export class RouterService {
    constructor(private router: Router) {}

    public goToRoot(): Observable<boolean> {
        return from(this.router.navigate(['/']));
    }

    public goToSimpleRoute(section: SectionEnum, route: AmstoreRouteEnum): void {
        this.router
            .navigate([section, route].filter((segment: string) => segment));
    }
    public generateLink(section: SectionEnum, route: AmstoreRouteEnum): string[] {
        return [section, route].filter((segment: string) => segment);
    }
}
