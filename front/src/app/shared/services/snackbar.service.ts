import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { OperatorFunction, pipe } from "rxjs";
import { tap } from "rxjs/operators";


@Injectable({
    providedIn: 'root'
})
export class SnackService {
    constructor(
        private snackBar: MatSnackBar,
    ) {
    }

    public getSnackTap<T extends { result: boolean }>(message: string): OperatorFunction<T, T> {
        return pipe(
            tap((result: T) => {
                if (result.result) {
                    this.snackBar.open(message, undefined, { duration: 5000 });
                }
            })
        )
    }
}
