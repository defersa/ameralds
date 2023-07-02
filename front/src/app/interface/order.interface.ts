import { IPattern } from "./pattern.interface"

export type OrdersRequest = {
    page: number;
    pageCount: number;
    orders: SmallOrders[];
}

export type SmallOrders = {
    id: number;
    status: number;
    create_date: string;
    jewels: any[];
    patterns: IPattern[];
}

export type IAdminCart = {
    purchases: IPatternPurchase[];
}

export type IPatternPurchase = {
    pattern: number;
    color: boolean;
    sizes: number[];
}

export type IAdminOrder = IAdminCart & {
    email: string;
    create_date: Date;
};

