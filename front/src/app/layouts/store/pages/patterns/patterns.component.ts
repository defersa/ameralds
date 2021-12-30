import { ThemePalette } from '@am/cdk/core/color';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterQuery } from 'src/app/components/paginated-page/paginated-page.component';
import { PageRequest, SmallPattern } from 'src/app/interface/pattern.interface';
import { PatternService } from '../../services/pattern.service';

type ButtonStatusMap = {
    label: string;
    action: (pattern: SmallPattern) => void;
    color: ThemePalette;
}

@Component({
    selector: 'app-patterns',
    templateUrl: './patterns.component.html',
    styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent implements OnInit, OnDestroy {

    public items: SmallPattern[] = [];
    public pageCount: number = 1;
    public page: number = 1;

    protected destroyed: Subject<void> = new Subject<void>();


    constructor(
        private pattern: PatternService
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.destroyed.next();
        this.destroyed.complete();
    }


    public nextPage(query: FilterQuery): void {
        this.pattern.getPatterns(query.page)
            .subscribe((next: PageRequest) => {
                this.pageCount = next.pageCount;
                this.page = next.page;
                this.items = next.items;
            });
    }

    public navigateToChild(id: number): void {
        this.pattern.goToCard(id);
    }

}
