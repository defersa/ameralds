import { Component, Injector, OnDestroy } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router, Event } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

export type ListType = {
    label: string;
    pathFragment: string[];
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
    public list: ListType[] = [];

    public currentPath$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    protected route: ActivatedRoute;
    protected router: Router;

    constructor(injector: Injector) {
        this.route = injector.get(ActivatedRoute);
        this.router = injector.get(Router);

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

    protected initList(value: ListType[]): void {
        this.list = value.map((item: ListType) => ({ ...item, path: '/' + item.pathFragment.join('/') }));
    }

    public ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

}
