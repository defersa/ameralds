import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EN_LANG_ROUTE_MAP, LangDictionary, RU_LANG_ROUTE_MAP } from '../utils/lang-builder';

type LangType = 'en' | 'ru';

@Injectable({
    providedIn: 'root'
})
export class LangService {
    public lang$: BehaviorSubject<LangType> = new BehaviorSubject<LangType>('ru');

    public langDictionary$: BehaviorSubject<LangDictionary> = new BehaviorSubject<LangDictionary>(RU_LANG_ROUTE_MAP);

    constructor() {
        this.lang$.subscribe((item: LangType) => {
            this.langDictionary$.next(item === 'en' ? EN_LANG_ROUTE_MAP : RU_LANG_ROUTE_MAP);
        });
    }
}
