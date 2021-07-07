import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FilterQuery } from 'src/app/components/paginated-page/paginated-page.component';
import { PageRequest, SmallPattern } from 'src/app/interface/pattern.interface';
import { PatternsService } from '../../services/patterns.service';

@Component({
    selector: 'app-patterns',
    templateUrl: './patterns.component.html',
    styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent implements OnInit {
    public items: SmallPattern[] = [];
    public pageCount: number = 1;
    public page: number = 1;

    protected destroyed: Subject<void> = new Subject<void>();


    constructor(
        private patternsService: PatternsService) {

    }

    ngOnInit(): void {
    }



    public nextPage(query: FilterQuery): void {
        this.patternsService.getPatterns(query.page).
            pipe(tap((next: PageRequest) => {
                this.pageCount = next.pageCount;
                this.page = next.page;
            })).subscribe((next: PageRequest) => {
                this.items = next.items;
            });
    }

    public navigateToChild(id: number): void {
        // this.patternsService.goToCard(id);
    }

}
