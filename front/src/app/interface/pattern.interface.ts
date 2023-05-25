import { CategoryType } from "./category.interface"
import { ImageModelSmall } from "./image.interface"
import { IdName } from "./request.interface"
import { LangNumber, LangString } from "@am/interface/lang.interface";
import { SizeType } from "@am/interface/size.interface";

export type IPattern = {
    id: number;
    name: LangString;
    price: LangNumber;

    description: string;

    create_date: any;
    images: ImageModelSmall[];
    category: CategoryType[]
    sizes?: IdName[];
}


export type PageRequest = {
    page: number;
    pageCount: number;
    items: PatternMaxType[];
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

export type PatternMaxType = {
    id: number;
    name: LangString;
    price: LangNumber;

    hidden: boolean;
    description: string;
    create_date: any;

    sizes: PattenSizeFiles[];
    colors: Blob | { id: number; };

    images: ImageModelSmall[];
    category: CategoryType[]
}

export type PatternSaveResultResponse = {
    sizes: PatternSaveSizeResult[];
    id: number;
    result: boolean;
}

export type PatternSaveSizeResult = {
    id: number;
    size: {
        id: number;
    };
}

export type PattenSizeFiles = {
    id: number;
    size: SizeType;
    cbb: Blob | { id: number; };
    jbb: Blob | { id: number; };
    png: Blob | { id: number; };
    pdf: Blob | { id: number; };
}
