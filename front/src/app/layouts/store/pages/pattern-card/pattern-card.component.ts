import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatternService } from '../../services/pattern.service';

@Component({
    selector: 'app-pattern-card',
    templateUrl: './pattern-card.component.html',
    styleUrls: ['./pattern-card.component.scss']
})
export class PatternCardComponent implements OnInit {

    private id: number;

    constructor(
        private route: ActivatedRoute,
        private pattern: PatternService
    ) {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
    }

    ngOnInit(): void {
        this.pattern.getPattern(this.id).subscribe((result)=>{
            console.log(result);
        })
    }

    public getBack(): void {
        this.pattern.getBack();
    }

}
