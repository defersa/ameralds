import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { SizeType } from 'src/app/interface/size.interface';
import { IdName, PaginatedResponse, ResultRequest } from 'src/app/interface/request.interface';
import { getAction, HttpActions } from 'src/app/utils/action-builder';
import { getStoreNavigatePath, StoreRoutes } from 'src/app/utils/router-builder';
import { OptionType } from "@am/interface/cdk.interface";


@Injectable({
    providedIn: 'root'
})
export class SizesService {

    public sizesList: OptionType[] = [];

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
        private snackBar: MatSnackBar,
        private router: Router
    ) {
    }


    public getSizes(page: number): Observable<PaginatedResponse<SizeType>> {
        return this.httpClient.get<PaginatedResponse<SizeType>>(getAction(HttpActions.Sizes) + page);
    }

    public getSize(id: number): Observable<SizeType> {
        return this.httpClient.get<{ size: SizeType }>(getAction(HttpActions.Size) + id)
            .pipe(map((result: { size: SizeType }) => result.size));
    }

    public getSizesAll(): Observable<OptionType[]> {
        return this.sizesList.length ? of(this.sizesList) : this.getAllSizes()
            .pipe(
                map((result: { items: SizeType[] }) => result.items.map((item: SizeType) => ({
                    label: String(item.value),
                    value: item.id
                }))),
                tap((result: OptionType[]) => this.sizesList = result));
    }

    public getAllSizes(): Observable<{ items: SizeType[] }> {
        return this.httpClient.get<{ items: SizeType[] }>(getAction(HttpActions.AllSizes));
    }

    public goToSizeAdd(): void {
        this.router.navigate(['/' + getStoreNavigatePath(StoreRoutes.SizeAdd)], {
            relativeTo: this.route,
            skipLocationChange: false
        });
    }

    public goToSizeEdit(id: number): void {
        this.router.navigate([getStoreNavigatePath(StoreRoutes.SizeEdit, id)], {
            relativeTo: this.route,
            skipLocationChange: false
        });
    }

    public goToSizes(): void {
        this.router.navigate([getStoreNavigatePath(StoreRoutes.Sizes)], {
            relativeTo: this.route,
            skipLocationChange: false
        });
    }

    public editSize(values: Record<string, unknown>): void {
        this.httpClient
            .patch<ResultRequest>(getAction(HttpActions.Size), values)
            .subscribe((response: ResultRequest) => {
                if (response.result) {
                    this.snackBar.open('Размер изменен!', undefined, { duration: 5000 });
                }
            });
    }

    public saveSize(values: Record<string, unknown>): void {
        this.httpClient
            .post<IdName>(getAction(HttpActions.Size), values)
            .subscribe((response: IdName) => {
                this.router.navigate([getStoreNavigatePath(StoreRoutes.SizeEdit, response.id)], {
                    relativeTo: this.route,
                    skipLocationChange: false
                })
                this.snackBar.open('Размер добавлен!', undefined, { duration: 5000 });
            });
    }

    public deleteSize(id: number): void {
        this.httpClient.delete<ResultRequest>(getAction(HttpActions.Size) + id)
            .subscribe((response: ResultRequest) => {
                this.goToSizes();
                this.snackBar.open('Размер удален!', undefined, { duration: 5000 });
            });
    }

}
