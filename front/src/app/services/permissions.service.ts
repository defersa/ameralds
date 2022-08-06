import { Injectable } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AccessEnum, ACCOUNT_ROUTES, RouterConfig, STORE_ROUTES } from '../utils/router-builder';
import { ProfileService } from './profile.service';

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {

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
            if (!this.canActivate(this.router.url)) {
                this.router.navigate(['']);
            }
        }
    }

    public canActivate(url: string): boolean {
        const urlMap: string[] = url
            .split('/')
            .filter((item: string) => !Number(item))
            .filter((item: string) => item !== '');

        const route: RouterConfig | undefined = [...ACCOUNT_ROUTES, ...STORE_ROUTES].find((item: RouterConfig) => PermissionsService.checkArrayEqual(item.path, urlMap));
        if (route === undefined) {
            console.warn('Unusual route');
            return true;
        }

        const status: AccessEnum = this.profile.authAndModerStatus$.getValue();

        return !Boolean((status === AccessEnum.None && route.access) || (status === AccessEnum.Auth && route.access === AccessEnum.Moder));
    }
}