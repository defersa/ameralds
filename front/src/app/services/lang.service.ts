import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type LangType = 'en' | 'ru';

@Injectable({
    providedIn: 'root'
})
export class LangService {
    public lang: BehaviorSubject<LangType> = new BehaviorSubject<LangType>('en');

    constructor() {

    }
}
