import { Injectable, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class AmstoreDestroyService extends Subject<void> implements OnDestroy {
    public ngOnDestroy(): void {
        this.next();
        this.complete();
    }
}
