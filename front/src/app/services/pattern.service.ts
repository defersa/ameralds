import { LangType } from '@am/interface/lang.interface';
import { IItemResponse, IListResponse, IPaginatedResponse, IResultRequest } from '@am/interface/request.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import {
    IPattern,
    PatternMaxType,
    PatternSaveResultResponse,
} from '@am/interface/pattern.interface';
import { getAction, HttpActions, UB } from '@am/utils/action-builder';
import { MapImage } from '../layouts/store/utils/images';


@Injectable({
    providedIn: 'root'
})
export class PatternService {
    constructor(
        private httpClient: HttpClient,
    ) {
    }

    public getPatterns(params: Params): Observable<IPaginatedResponse<PatternMaxType>> {
        return this.httpClient.get<IPaginatedResponse<PatternMaxType>>(UB(['api', 'patterns', 'paginated']), { params })
            .pipe(map((value: IPaginatedResponse<PatternMaxType>) => {
                value.items.forEach((pattern: PatternMaxType) => pattern.images = pattern.images.map(MapImage));
                return value;
            }));
    }

    public getPattern(id: number): Observable<PatternMaxType> {
        return this.httpClient
            .get<IItemResponse<PatternMaxType>>(UB(['api', 'patterns']), { params: { id: String(id) } })
            .pipe(
                filter((value: IItemResponse<PatternMaxType>) => {
                    if (!value.result) {
                        return false;
                    }
                    return true;
                }),
                map((value: IItemResponse<PatternMaxType>) => {
                    value.item.images = value.item.images.map(MapImage);
                    return value.item;
                })
            );
    }

    public getPatternsByIds(ids: number[]): Observable<IPattern[]> {
        return this.httpClient.get<IListResponse<IPattern>>(UB(['api', 'patterns', 'by-ids']), { params: { ids } })
            .pipe(
                map((value: IListResponse<IPattern>) => value.items));
    }

    public getPatternEdit(id: number): Observable<PatternMaxType> {
        return this.httpClient
            .get<IItemResponse<PatternMaxType>>(UB(['api', 'patterns', 'edit']), { params: { id: String(id) } })
            .pipe(
                filter((value: IItemResponse<PatternMaxType>) => {
                    if (!value.result) {
                        return false;
                    }
                    return true
                }),
                map((value: IItemResponse<PatternMaxType>) => {
                    value.item.images = value.item.images.map(MapImage);
                    return value.item;
                })
            );
    }

    public createPattern(data: any): Observable<PatternSaveResultResponse> {
        return this.httpClient.post<PatternSaveResultResponse>(UB(['api', 'patterns', 'edit']), data);
    }

    public updatePattern(data: any): Observable<PatternSaveResultResponse> {
        return this.httpClient.patch<PatternSaveResultResponse>(UB(['api', 'patterns', 'edit']), data);
    }

    public removePattern(id: number): Observable<IResultRequest> {
        return this.httpClient.delete<IResultRequest>(UB(['api', 'patterns', 'edit']), { params: { id: String(id) } });
    }

    public setPatternSizeFiles(data: FormData): Observable<IResultRequest> {
        return this.httpClient.post<IResultRequest>(getAction(HttpActions.PatternSizeFile), data);
    }

    public setPatternColorFile(data: FormData): Observable<IResultRequest> {
        return this.httpClient.post<IResultRequest>(getAction(HttpActions.PatternColorsFile), data);
    }

    public sendPatternMail(email: string, lang: LangType, patternId: number, sizes: number[]): Observable<IResultRequest> {
        const data: Record<string, unknown> = {
            email,
            lang,
            id: patternId,
            sizes
        }
        return this.httpClient.post<IResultRequest>(getAction(HttpActions.SendMail), data);
    }


    public downloadPatternBySize(patternSizeId: number, format: string): Observable<Blob> {
        // @ts-ignore
        return this.httpClient.get<Blob>((getAction(HttpActions.PatternDownloadSizeFile) + 'patternSizeId=' + patternSizeId + '/format=' + format), { responseType: 'blob' });
    }

    public downloadColor(pattern: number): Observable<Blob> {
        // @ts-ignore
        return this.httpClient.get<Blob>((getAction(HttpActions.PatternDownloadColorsFile) + 'id=' + pattern), { responseType: 'blob' });
    }
}
