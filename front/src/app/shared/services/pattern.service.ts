import { LangType } from '@am/interface/lang.interface';
import { ItemRequest, ResultRequest } from '@am/interface/request.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
    PageRequest,
    PatternMaxType,
    PatternSaveResultResponse,
} from 'src/app/interface/pattern.interface';
import { getAction, HttpActions } from 'src/app/utils/action-builder';
import { MapImage } from '../../layouts/store/utils/images';


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
    ) {
    }

    public getPatterns(page: number = 1, categories: number[] = [], sizes: number[] = [], search: string = ''): Observable<PageRequest> {
        const getArray: (arr: number[]) => string = (arr: number[]) => arr?.length ? arr.join('-') : 'null';
        const query: string = `page=${page}/categories=${getArray(categories)}/sizes=${getArray(sizes)}` + (search !== '' ? `/search=${search}` : '');

        return this.httpClient.get<PageRequest>(getAction(HttpActions.Patterns) + query)
            .pipe(map((value: PageRequest) => {
                value.items.forEach((pattern: PatternMaxType) => pattern.images = pattern.images.map(MapImage));
                return value;
            }));
    }

    public getPattern(id: number): Observable<PatternMaxType> {
        return this.httpClient
            .get<ItemRequest<PatternMaxType>>(getAction(HttpActions.Pattern), {params: {id: String(id)}})
            .pipe(
                filter((value: ItemRequest<PatternMaxType>) => {
                    if (!value.result) {
                        this.getBack();
                        return false;
                    }
                    return true
                }),
                map((value: ItemRequest<PatternMaxType>) => {
                    value.item.images = value.item.images.map(MapImage);
                    return value.item;
                })
            );
    }

    public getPatternEdit(id: number): Observable<PatternMaxType> {
        return this.httpClient
            .get<ItemRequest<PatternMaxType>>(getAction(HttpActions.PatternEdit), {params: {id: String(id)}})
            .pipe(
                filter((value: ItemRequest<PatternMaxType>) => {
                    if (!value.result) {
                        this.getBack();
                        return false;
                    }
                    return true
                }),
                map((value: ItemRequest<PatternMaxType>) => {
                    value.item.images = value.item.images.map(MapImage);
                    return value.item;
                })
            );
    }

    public createPattern(data: any): Observable<PatternSaveResultResponse> {
        return this.httpClient.post<PatternSaveResultResponse>(getAction(HttpActions.PatternEdit), data);
    }

    public updatePattern(data: any): Observable<PatternSaveResultResponse> {
        return this.httpClient.patch<PatternSaveResultResponse>(getAction(HttpActions.PatternEdit), data);
    }

    public removePattern(id: number): Observable<ResultRequest> {
        return this.httpClient.delete<ResultRequest>(getAction(HttpActions.PatternEdit), {params: {id: String(id)}});
    }

    public setPatternSizeFiles(data: FormData): Observable<ResultRequest> {
        return this.httpClient.post<ResultRequest>(getAction(HttpActions.PatternSizeFile), data);
    }

    public setPatternColorFile(data: FormData): Observable<ResultRequest> {
        return this.httpClient.post<ResultRequest>(getAction(HttpActions.PatternColorsFile), data);
    }

    public sendPatternMail(email: string, lang: LangType, patternId: number, sizes: number[]): Observable<ResultRequest> {
        const data: Record<string, unknown> = {
            email,
            lang,
            id: patternId,
            sizes
        }
        return this.httpClient.post<ResultRequest>(getAction(HttpActions.SendMail), data);
    }

    public getBack(): void {
        this.router.navigate(['/patterns'], {
            relativeTo: this.route,
            queryParams: this.queryParams,
            skipLocationChange: false
        })
    }

    public goToEdit(id: number): Promise<boolean> {
        return this.router.navigate(['/pattern-edit', id], {
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

    public downloadPatternBySize(patternSizeId: number, format: string): Observable<Blob> {
        // @ts-ignore
        return this.httpClient.get<Blob>((getAction(HttpActions.PatternDownloadSizeFile) + 'patternSizeId=' + patternSizeId + '/format=' + format), {responseType: 'blob'});
    }

    public downloadColor(pattern: number): Observable<Blob> {
        // @ts-ignore
        return this.httpClient.get<Blob>((getAction(HttpActions.PatternDownloadColorsFile) + 'id=' + pattern), {responseType: 'blob'});
    }
}
