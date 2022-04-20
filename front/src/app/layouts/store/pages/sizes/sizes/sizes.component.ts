import { PaginatedResponse } from '@am/interface/request.interface';
import { SizeType } from '@am/interface/size.interface';
import { FilterQuery } from '@am/shared/paginated-page/paginated-page.component';
import { SizesService } from '@am/shared/services/sizes.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss']
})
export class SizesComponent implements OnInit {

    public items: SizeType[] = [];
    public pageCount: number = 1;
    public page: number = 1;

    constructor(
        private sizes: SizesService
    ) {
    }

    public ngOnInit(): void {
    }

    public nextPage(query: FilterQuery): void {
        this.sizes.getSizes(query.page)
            .subscribe((next: PaginatedResponse<SizeType>) => {
                this.pageCount = next.pageCount;
                this.page = next.page;
                this.items = next.items;
            });
    }

    public sizeAdd(): void {
        this.sizes.goToSizeAdd();
    }

    public sizeEdit(id: number): void {
        this.sizes.goToSizeEdit(id);
    }

    public getDate(date: string): string {
        return moment(date).format("YYYY.MM.DD HH:mm");
    }
}
