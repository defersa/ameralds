import { Component, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router, Event } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AccessEnum, RouterConfig } from 'src/app/utils/router-builder';

export type MenuListType = {
    label: string;
    path?: string;
}

@Component({
    selector: 'app-menu-middleware',
    templateUrl: './menu-middleware.component.html',
    styleUrls: ['./menu-middleware.component.scss']
})
export class MenuMiddlewareComponent implements OnDestroy {

    private destroyed: Subject<void> = new Subject<void>();

    public filters: unknown[] = [];
    public list: MenuListType[] = [];
    private rawList: RouterConfig[] = [];
    private menuType: 'store' | 'account' = 'store';


    public currentPath$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    protected route: ActivatedRoute;
    protected router: Router;
    protected profileService: ProfileService;

    constructor(injector: Injector) {
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.profileService = injector.get(ProfileService);


        this.profileService.authAndModerStatus$
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => this.updateMenuList());


        this.profileService.langDictionary$
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => this.updateMenuList());

        this.router.events
            .pipe(
                takeUntil(this.destroyed),
                filter((event: Event) => event instanceof ActivationEnd && event.snapshot.children.length === 0),
                map((event: Event) => event as ActivationEnd)
            )
            .subscribe((event: ActivationEnd) => {
                this.currentPath$.next(this.router.url);
            });
    }

    protected initList(value: RouterConfig[], menuType: 'account' | 'store'): void {
        this.rawList = value.filter((item: RouterConfig) => !item.prefix);
        this.menuType = menuType;
        this.updateMenuList();
    }

    private updateMenuList(): void {
        const status: AccessEnum = this.profileService.authAndModerStatus$.getValue();
        let list: RouterConfig[] = this.rawList;

        if (status === AccessEnum.Auth) {
            list = this.rawList.filter((item: RouterConfig) => item.access !== AccessEnum.Moder);
        }
        if (status === AccessEnum.None) {
            list = this.rawList.filter((item: RouterConfig) => !item.access);
        }
        const dict: Record<string, string> = this.profileService.langDictionary$.getValue().routes[this.menuType];
        this.list = list.map((item: RouterConfig) => ({
            path: item.path.map((path: string) =>  '/' + path).join(''),
            label: dict[item.name]
        }));
    }

    public ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

}
