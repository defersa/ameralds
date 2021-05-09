import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getAction, HttpActions } from 'src/app/utils/action-builder';

export type PatternType = {
    name: string
    id: number;
    description: string;
    urls: string;
    price_ru: number;
    price_eu: number;
    create_date: any;
}
export type PatternRequest = {
    pattern: PatternType;
    user_rating: { score: number; };
}

@Injectable({
    providedIn: 'root'
})
export class PatternService {

    public get queryParams(): Params | null {
        return this._queryParams;
    }

    public set queryParams(value: Params| null) {
        this._queryParams = value;
    }

    private _queryParams: Params | null = null;

    constructor(
        private httpClient: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    public getPatterns(page: number = 1): Observable<any> {
        return this.httpClient.get(getAction(HttpActions.GetPatterns) + page);
    }
    public getPattern(id: number): Observable<PatternRequest> {
        return this.httpClient.get<PatternRequest>(getAction(HttpActions.GetPattern), {params: {id: String(id)}});
    }
    public createPattern(data: any): Observable<{id: number}> {
        return this.httpClient.post<{id: number}>(getAction(HttpActions.GetPattern), data);
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
}
