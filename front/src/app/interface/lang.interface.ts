
export type LangType = 'en' | 'ru';

export type LangObject = {
    type: LangType;
    label: string;
    url: string;
}

export type LangString = {
    en: string;
    ru: string;
};

export type LangNumber = {
    en: number;
    ru: number;
};
