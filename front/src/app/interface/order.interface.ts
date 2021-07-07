import { SmallPattern } from "./pattern.interface"

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
    patterns: SmallPattern[];
}