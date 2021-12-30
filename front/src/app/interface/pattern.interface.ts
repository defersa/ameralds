import { ImageModelSmall } from "./image.interface"
import { IdName } from "./request.interface"

export type SmallPattern = {
    id: number;
    name: string;
    description: string;
    urls: string;
    price_ru: number;
    price_en: number;
    create_date: any;
    images: ImageModelSmall[];
    categories?: IdName[];
    sizes?: IdName[];
}


export type PageRequest = {
    page: number;
    pageCount: number;
    items: SmallPattern[];
}

export type PatternType = {
    name: string
    id: number;
    description: string;
    urls: string;
    price_ru: number;
    price_en: number;
    create_date: any;
    images: ImageModelSmall[];
}
export type PatternRequest = {
    result: Boolean;
    pattern: PatternType;
    user_rating: { score: number; };
}
