import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PageRequest, PatternRequest, SmallPattern } from 'src/app/interface/pattern.interface';
import { getAction, HttpActions } from 'src/app/utils/action-builder';
import { MapImage } from '../utils/images';


@Injectable({
    providedIn: 'root'
})
export class PatternService {

    public get queryParams(): Params | null {
        return this._queryParams;
    }

    public set queryParams(value: Params | null) {
        this._queryParams = value;
    }

    private _queryParams: Params | null = null;

    constructor(
        private httpClient: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    public getPatterns(page: number = 1): Observable<PageRequest> {
        return this.httpClient.get<PageRequest>(getAction(HttpActions.Patterns) + page)
            .pipe(map((value: PageRequest) => {
                value.items.forEach((pattern: SmallPattern) => pattern.images = pattern.images.map(MapImage));
                return value;
            }));
    }
    public getPattern(id: number): Observable<PatternRequest> {
        return this.httpClient
            .get<PatternRequest>(getAction(HttpActions.Pattern), { params: { id: String(id) } })
            .pipe(
                filter((value: PatternRequest) => {
                    if (!value.result) {
                        this.getBack();
                        return false;
                    }
                    return true
                }),
                map((value: PatternRequest) => {
                    value.pattern.images = value.pattern.images.map(MapImage);
                    return value;
                })
            );
    }
    public createPattern(data: any): Observable<{ id: number }> {
        return this.httpClient.post<{ id: number }>(getAction(HttpActions.PatternEdit), data);
    }
    public updatePattern(data: any): Observable<{ id: number }> {
        return this.httpClient.patch<{ id: number }>(getAction(HttpActions.PatternEdit), data);
    }
    public removePattern(id: number): Observable<{ result: boolean }> {
        return this.httpClient.delete<{ result: boolean }>(getAction(HttpActions.PatternEdit), { params: { id: String(id) } });
    }

    public getBack(): void {
        this.router.navigate(['/patterns'], {
            relativeTo: this.route,
            queryParams: this.queryParams,
            skipLocationChange: false
        })
    }
    public goToEdit(id: number): void {
        this.router.navigate(['/pattern-edit', id], {
            relativeTo: this.route,
            queryParams: this.queryParams,
            skipLocationChange: false
        })
    }
    public goToCard(id: number): void {
        this.router.navigate(['/pattern-card', id], {
            relativeTo: this.route,
            queryParams: this.queryParams,
            skipLocationChange: false
        })
    }
}
