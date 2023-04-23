import { Component } from '@angular/core';
import { FilterQuery } from '@am/shared/paginated-page/paginated-page.component';
import { CategoriesService } from '@am/shared/services/categories.service';
import { CategoryType } from '@am/interface/category.interface';
import { PaginatedResponse } from '@am/interface/request.interface';


@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

    public items: CategoryType[] = [];
    public pageCount: number = 1;

    constructor(
        private categories: CategoriesService
    ) {
    }

    public nextPage(query: FilterQuery): void {
        this.categories.getCategories(query.page)
            .subscribe((next: PaginatedResponse<CategoryType>) => {
                this.pageCount = next.pageCount;
                this.items = next.items;
            });
    }
}
