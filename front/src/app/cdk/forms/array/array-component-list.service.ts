import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ArrayComponentListService {

    private _controlObj: Record<string, FormControl[]> = {};

    constructor() { }

    public getControls(name: string): FormControl[] | undefined {
        if (!this._controlObj[name]) {
           return;
        }
        return this._controlObj[name];
    }

    public addControl(name: string, control: FormControl): void {
        if (!this._controlObj[name]) {
            this._controlObj[name] = [];
        }

        this._controlObj[name].push(control);
    }

    public removeControl(name: string, control: FormControl): void {
        if (this._controlObj[name]) {
            this._controlObj[name] = this._controlObj[name].filter((item: FormControl) => item !== control);
        }
    }

}
