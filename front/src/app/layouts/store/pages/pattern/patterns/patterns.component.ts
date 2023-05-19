import { Component } from '@angular/core';
import { DestroySubject } from "@am/utils/destroy.service";
import { AbstractPatternsIndex } from "@am/shared/actions/pattern/pattern-index.abstract";


@Component({
    selector: 'store-patterns',
    templateUrl: './patterns.component.html',
    styleUrls: ['./patterns.component.scss'],
    providers: [DestroySubject],
})
export class PatternsComponent extends AbstractPatternsIndex {
}
