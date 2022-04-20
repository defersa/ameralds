import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FilterQuery } from 'src/app/shared/paginated-page/paginated-page.component';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { CategoryType } from 'src/app/interface/category.interface';
import { PaginatedResponse } from 'src/app/interface/request.interface';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

    public items: CategoryType[] = [];
    public pageCount: number = 1;

    constructor(
        private categories: CategoriesService
    ) {
    }

    public ngOnInit(): void {
    }

    public nextPage(query: FilterQuery): void {
        this.categories.getCategories(query.page)
            .subscribe((next: PaginatedResponse<CategoryType>) => {
                this.pageCount = next.pageCount;
                this.items = next.items;
            });
    }

    public categoryAdd(): void {
        this.categories.goToCategoryAdd();
    }

    public categoryEdit(id: number): void {
        this.categories.goToCategoryEdit(id);
    }

    public getDate(date: string): string {
        return moment(date).format("YYYY.MM.DD HH:mm");
    }
}
