import { Component, OnInit } from '@angular/core';
import { LangService } from 'src/app/services/lang.service';

export type LangType = 'en' | 'ru';

export type LangObject = {
    type: LangType;
    label: string;
    url: string;
}

const LANGS: Record<LangType, LangObject> = {
    'en': {
        type: 'en',
        label: 'English',
        // url: 'assets/flag/en.png'
        url: 'assets/flag/en_v2.png'
    },
    'ru': {
        type: 'ru',
        label: 'Русский',
        url: 'assets/flag/ru.png'
    },
};

@Component({
    selector: 'amstore-language',
    templateUrl: './language.component.html',
    styleUrls: ['./language.component.scss']
})
export class AmastoreLanguageComponent implements OnInit {

    public get currentTypeObj(): LangObject {
        return LANGS[this.currentType];
    }

    public panelOpen: boolean = false;

    public currentType: LangType = 'en';

    public langTypesList: LangObject[] = Object.values(LANGS);

    constructor(private langService: LangService) { }

    ngOnInit(): void {
        this.langService.lang.subscribe((lang: LangType) => this.currentType = lang);
    }

    public setLang(lang: LangType): void {
        this.close();
        this.langService.lang.next(lang);
    }

    public toggle(): void {
        this.panelOpen ? this.close() : this.open();
    }

    public close(): void {
        this.panelOpen = false;
    }

    public open(): void {
        this.panelOpen = true;
    }
}
