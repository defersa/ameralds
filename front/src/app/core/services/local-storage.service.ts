import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() { }

    public getVariable(name: string): unknown {
        return window.localStorage.getItem(name);
    }

    public setVariable(name: string, value: unknown): void {
        window.localStorage.setItem(name, JSON.stringify(value));
    }
}
