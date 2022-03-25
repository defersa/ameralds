import { PatternMaxType } from "./pattern.interface"
import { LangNumber } from "@am/interface/lang.interface";

export type GoodsCard = {
    jewels: ProductLite[];
    patterns: PatternMaxType[];
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
    price: LangNumber;
}

export type GoodsStatusResult = {
    result: boolean;
    patterns: {id: number}[];
    goods: GoodsCard;
}
