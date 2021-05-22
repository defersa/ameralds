import { SmallPattern } from "./pattern.interface"

export type GoodsCard = {
    jewels: ProductLite[];
    patterns: SmallPattern[];
    id: number;
}
export type GoodsModifire = {
    goods: GoodsCard;
    result: boolean;
}
export enum PriceLocation {
    EN = 'price_en',
    RU = 'price_ru'
}

export enum ProductType {
    Patterns = 'patterns',
    Jewels = 'jewels'
}

export type ProductLite = {
    id: number;
    price_en: number;
    price_ru: number;
}
