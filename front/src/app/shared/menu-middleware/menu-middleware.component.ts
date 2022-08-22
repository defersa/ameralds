import { Component, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router, Event } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { LangService } from 'src/app/services/lang.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AccessEnum, PartialRouterConfig, ROUTES_MAP, SectionEnum } from 'src/app/utils/router-builder';
import { IconsName } from "@am/cdk/icons/icons.service";

export type MenuListType = {
    label: string;
    path?: string;
    icon?: IconsName;
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
    private rawList: PartialRouterConfig[] = [];
    private menuType: SectionEnum = SectionEnum.Store;


    public currentPath$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    protected route: ActivatedRoute;
    protected router: Router;
    protected profileService: ProfileService;
    protected langService: LangService;

    constructor(injector: Injector) {
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);
        this.profileService = injector.get(ProfileService);
        this.langService = injector.get(LangService);


        this.profileService.authAndModerStatus$
            .pipe(takeUntil(this.destroyed))
            .subscribe(() => this.updateMenuList());


        this.langService.langDictionary$
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

    protected initList(menuType: SectionEnum): void {
        this.rawList = ROUTES_MAP[menuType].pages.filter((item: PartialRouterConfig) => !item.prefix);
        this.menuType = menuType;
        this.updateMenuList();
    }

    private updateMenuList(): void {
        const status: AccessEnum = this.profileService.authAndModerStatus$.getValue();
        let list: PartialRouterConfig[] = this.rawList;

        if (status === AccessEnum.Auth) {
            list = this.rawList.filter((item: PartialRouterConfig) => item.access !== AccessEnum.Moder);
        }
        if (status === AccessEnum.None) {
            list = this.rawList.filter((item: PartialRouterConfig) => !item.access);
        }

        const dict: Record<string, string> = this.langService.langDictionary$.getValue().routes[this.menuType];
        this.list = list.map((item: PartialRouterConfig) => ({
            path: [this.menuType, item.path]
                .filter((item: string) => item)
                .map((key: string) => '/' + key)
                .join(''),
            label: dict[item.path],
            icon: item.icon
        }));
    }

    public ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

}
