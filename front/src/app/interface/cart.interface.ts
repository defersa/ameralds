import { LangNumber } from "@am/interface/lang.interface";

export interface UserCart {
    id: string;
    patterns: CartPattern[];
    jewelry: CartJewelry[];
}

export interface CartPattern {
    id: number;
    sizes: number[];
    colors: boolean;
    price: LangNumber;
}

export interface CartJewelry {
    id: number;
    price: LangNumber;
}
