import { Injectable } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
    AccessEnum, PartialRouterConfig, ROUTES_MAP, SectionEnum,
} from '../utils/router-builder';
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
            .map((item: string) => item.replace(/[?#](.*)/g, ''))
            .filter((item: string) => !Number(item))
            .filter((item: string) => item !== '');

        if(urlMap.length === 0) {
            return true;
        }

        if(urlMap.length === 1) {
            urlMap.unshift(SectionEnum.Store)
        }

        const route: PartialRouterConfig | undefined = ROUTES_MAP[urlMap[0] as SectionEnum].pages
            .find((item: PartialRouterConfig) => item.path === urlMap[1]);

        if (route === undefined) {
            console.warn('Unusual route');
            return true;
        }

        const status: AccessEnum = this.profile.authAndModerStatus$.getValue();

        return !Boolean((status === AccessEnum.None && route.access) || (status === AccessEnum.Auth && route.access === AccessEnum.Moder));
    }
}
