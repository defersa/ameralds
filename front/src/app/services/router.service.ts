import { Injectable } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AccessEnum, ACCOUNT_ROUTES, RouterConfig, STORE_ROUTES } from '../utils/router-builder';
import { ProfileService } from './profile.service';

@Injectable({
    providedIn: 'root'
})
export class RouterService {

    constructor(
        private router: Router,
        private profile: ProfileService) {
        this.router.events
            .pipe(filter((event: Event) => event instanceof NavigationEnd))
            .subscribe(this.getCheckCurrentRoute());
        this.profile.authAndModerStatus$
            .subscribe(this.getCheckCurrentRoute());
    }

    public static checkArrayEqual(a: string[], b: string[]): boolean {
        return a.join() === b.join();
    }

    public getCheckCurrentRoute(): () => void {
        return () => {
            const url: string[] = this.router.url
                .split('/')
                .filter((item: string) => !Number(item))
                .filter((item: string) => item !== '');

            const route: RouterConfig | undefined = [...ACCOUNT_ROUTES, ...STORE_ROUTES].find((item: RouterConfig) => RouterService.checkArrayEqual(item.path, url));
            if (route === undefined) {
                return;
            }

            const status: AccessEnum = this.profile.authAndModerStatus$.getValue();

            const accessDenied: boolean = Boolean((status === AccessEnum.None && route.access) || (status === AccessEnum.Auth && route.access === AccessEnum.Moder));
            if(accessDenied) {
                this.router.navigate(['']);
            }
        }
    }
}
