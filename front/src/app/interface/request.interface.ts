export type ResultRequest = {
    result: boolean;
}

export type IdName = {
    id: number;
    name: string;
}

export type IdRequest = {
    id: number;
}

export type PaginatedResponse<T> = {
    page: number;
    pageCount: number;
    items: T[];
}
export type ItemRequest<T> = {
    result: boolean;
    item: T;
}