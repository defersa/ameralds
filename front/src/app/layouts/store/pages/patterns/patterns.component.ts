import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PatternService } from '../../services/pattern.service';

export type SmallPattern = {
    id: number;
    name: string;
    description: string;
    urls: string;
    price_ru: number;
    price_eu: number;
    create_date: any;
}

type PageRequest = {
    page: number;
    pageCount: number;
    items: SmallPattern[];
}

@Component({
    selector: 'app-patterns',
    templateUrl: './patterns.component.html',
    styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent implements OnInit, OnDestroy {

    public items: SmallPattern[] = [];
    public pageCount: number = 1;
    public page: number = 1;

    protected destroyed: Subject<void> = new Subject<void>();

    public get queryParams$(): Observable<Params> {
        return this.activateRoute.queryParams?.pipe(
            takeUntil(this.destroyed)
        );
    }

    constructor(
        private activateRoute: ActivatedRoute,
        private pattern: PatternService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initQuerySubscribe();
    }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }

    public setQueryParams(page: number): void {
        this.pattern.queryParams = { page };
        this.router.navigate([], {
            relativeTo: this.activateRoute,
            queryParams: this.pattern.queryParams,
            queryParamsHandling: 'merge',
            skipLocationChange: false
        })
    }

    public initQuerySubscribe(): void {
        this.activateRoute.queryParams?.pipe(
            takeUntil(this.destroyed)
        ).subscribe((params: Params) => {
            this.pattern.queryParams = params;
            this.nextPage(params.page ? params.page : 1);
        });
    }

    public nextPage(page: number): void {
        this.pattern.getPatterns(page).subscribe((next: PageRequest) => {
            this.pageCount = next.pageCount;
            this.page = next.page;
            this.items = next.items;
        })
    }

    public navigateToChild(id: number): void {
        this.router.navigate(['/pattern-card', id], {
            relativeTo: this.activateRoute,
            queryParams: this.pattern.queryParams,
            skipLocationChange: false
        })
    }

}
