import { Component } from '@angular/core';
import { PatternMaxType } from 'src/app/interface/pattern.interface';
import { PatternsService } from '../../services/patterns.service';

@Component({
    selector: 'app-patterns',
    templateUrl: './patterns.component.html',
    styleUrls: ['./patterns.component.scss']
})
export class PatternsComponent {
    public items: PatternMaxType[] = [];
    public pageCount: number = 1;
    public page: number = 1;


    constructor(
        private patternsService: PatternsService) {

    }

    ngOnInit(): void {
    }



}
