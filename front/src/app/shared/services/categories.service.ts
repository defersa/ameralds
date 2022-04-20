import { OptionType } from '@am/interface/cdk.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CategoryType } from 'src/app/interface/category.interface';
import { IdName, PaginatedResponse, ResultRequest } from 'src/app/interface/request.interface';
import { getAction, HttpActions } from 'src/app/utils/action-builder';
import { getStoreNavigatePath, StoreRoutes } from 'src/app/utils/router-builder';


@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    public get queryParams(): Params | null {
        return this._queryParams;
    }

    public set queryParams(value: Params | null) {
        this._queryParams = value;
    }

    public categoriesList: CategoryType[] = [];

    private _queryParams: Params | null = null;

    constructor(
        private httpClient: HttpClient,
        private route: ActivatedRoute,
        private snackBar: MatSnackBar,
        private router: Router
    ) {
    }


    public getCategories(page: number): Observable<PaginatedResponse<CategoryType>> {
        return this.httpClient.get<PaginatedResponse<CategoryType>>(getAction(HttpActions.Categies) + page);
    }

    public getCategoriesAllUniversal(): Observable<OptionType[]> {
        return (this.categoriesList.length ? of(this.categoriesList) : this._requestCategoriesAll())
            .pipe(
                map((items: CategoryType[]) => items.map((item: CategoryType) => ({
                    label: Object.values(item.name).join(),
                    value: item.id
                })))
            );
    }

    public getCategoriesAll(): Observable<CategoryType[]> {
        return this.categoriesList.length ? of(this.categoriesList) : this._requestCategoriesAll();
    }

    public getCategory(id: number): Observable<CategoryType> {
        return this.httpClient.get<{ category: CategoryType }>(getAction(HttpActions.Category) + id)
            .pipe(map((result: { category: CategoryType }) => result.category));
    }

    public goToCategoryAdd(): void {
        this.router.navigate(['/' + getStoreNavigatePath(StoreRoutes.CategoryAdd)], {
            relativeTo: this.route,
            skipLocationChange: false
        });
    }

    public goToCategoryEdit(id: number): void {
        this.router.navigate([getStoreNavigatePath(StoreRoutes.CategoryEdit, id)], {
            relativeTo: this.route,
            skipLocationChange: false
        });
    }

    public goToCategories(): void {
        this.router.navigate([getStoreNavigatePath(StoreRoutes.Categories)], {
            relativeTo: this.route,
            skipLocationChange: false
        });
    }

    public editCategory(values: Record<string, unknown>): void {
        this.httpClient
            .patch<ResultRequest>(getAction(HttpActions.Category), values)
            .subscribe((response: ResultRequest) => {
                if (response.result) {
                    this.snackBar.open('Категория изменена!', undefined, { duration: 5000 });
                }
            });
    }

    public saveCategory(values: Record<string, unknown>): void {
        this.httpClient
            .post<IdName>(getAction(HttpActions.Category), values)
            .subscribe((response: IdName) => {
                this.router.navigate([getStoreNavigatePath(StoreRoutes.CategoryEdit, response.id)], {
                    relativeTo: this.route,
                    skipLocationChange: false
                })
                this.snackBar.open('Категория добавлена!', undefined, { duration: 5000 });
            });
    }

    public deleteCategory(id: number): void {
        this.httpClient.delete<ResultRequest>(getAction(HttpActions.Category) + id)
            .subscribe((response: ResultRequest) => {
                this.goToCategories();
                this.snackBar.open('Категория удалена!', undefined, { duration: 5000 });
            });
    }

    private _requestCategoriesAll(): Observable<CategoryType[]> {
        return this.httpClient.get<{ items: CategoryType[] }>(getAction(HttpActions.AllCategies))
            .pipe(
                map((result: { items: CategoryType[] }) => result.items),
                tap((result: CategoryType[]) => this.categoriesList = result)
            );
    }
}
