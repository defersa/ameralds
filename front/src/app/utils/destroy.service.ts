import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class DestroySubject extends Subject<void> implements OnDestroy {
    public ngOnDestroy(): void {
        this.next();
        this.complete();
    }
}
