export enum StoreRoutes {
    Account = 'account',

    Store = '',
    Patterns = 'patterns',
    PatternCard = 'pattern-card',
    PatternEdit = 'pattern-edit',
    PatternAdd = 'pattern-add',
    Jewelrys = 'jewelrys',
    JewelryCard = 'jewelry-card',
    JewelryEdit = 'pattern-edit',
    JewelryAdd = 'jewelry-add',

    Categories = 'categories',
    CategoryAdd = 'category-add',
    CategoryEdit = 'category-edit',

    Sizes = 'sizes',
    SizeAdd = 'size-add',
    SizeEdit = 'size-edit'
}

export enum AccountRoutes {
    Store = '',

    Account = 'account',
    Goods = 'goods',
    Orders = 'orders',
    Patterns = 'patterns',
    PatternCard = 'pattern-card',
    Profile = 'profile'
}

export enum AuthRoutes {
    Auth = 'auth',
    Register = 'register'
}

export enum AccessEnum {
    None = 'none',
    Auth = 'auth',
    Moder = 'moder'
}


export type RouterConfig = {
    name: StoreRoutes | AccountRoutes | AuthRoutes;
    path: (StoreRoutes | AccountRoutes | AuthRoutes)[];
    prefix?: ':id';
    access?: AccessEnum;
}

export const STORE_ROUTES: RouterConfig[] = [
    { name: AccountRoutes.Account, path: [AccountRoutes.Account] },
    { name: StoreRoutes.Patterns, path: [StoreRoutes.Patterns] },
    { name: StoreRoutes.PatternCard, path: [StoreRoutes.PatternCard], prefix: ':id' },
    { name: StoreRoutes.PatternEdit, path: [StoreRoutes.PatternEdit], prefix: ':id', access: AccessEnum.Moder },
    { name: StoreRoutes.PatternAdd, path: [StoreRoutes.PatternAdd], access: AccessEnum.Moder },
    { name: StoreRoutes.Jewelrys, path: [StoreRoutes.Jewelrys] },
    { name: StoreRoutes.JewelryCard, path: [StoreRoutes.JewelryCard], prefix: ':id' },
    { name: StoreRoutes.JewelryEdit, path: [StoreRoutes.JewelryEdit], prefix: ':id', access: AccessEnum.Moder },
    { name: StoreRoutes.JewelryAdd, path: [StoreRoutes.JewelryAdd], access: AccessEnum.Moder },
    { name: StoreRoutes.Categories, path: [StoreRoutes.Categories], access: AccessEnum.Moder },
    { name: StoreRoutes.CategoryAdd, path: [StoreRoutes.CategoryAdd], access: AccessEnum.Moder },
    { name: StoreRoutes.CategoryEdit, path: [StoreRoutes.CategoryEdit], prefix: ':id', access: AccessEnum.Moder },
    { name: StoreRoutes.Sizes, path: [StoreRoutes.Sizes], access: AccessEnum.Moder },
    { name: StoreRoutes.SizeAdd, path: [StoreRoutes.SizeAdd], access: AccessEnum.Moder },
    { name: StoreRoutes.SizeEdit, path: [StoreRoutes.SizeEdit], prefix: ':id', access: AccessEnum.Moder },
];

export const ACCOUNT_ROUTES: RouterConfig[] = [
    { name: StoreRoutes.Store, path: [] },
    { name: AccountRoutes.Profile, path: [AccountRoutes.Account, AccountRoutes.Profile], access: AccessEnum.Auth },
    { name: AccountRoutes.Goods, path: [AccountRoutes.Account, AccountRoutes.Goods] },
    { name: AccountRoutes.Orders, path: [AccountRoutes.Account, AccountRoutes.Orders], access: AccessEnum.Auth },
    { name: AccountRoutes.Patterns, path: [AccountRoutes.Account, AccountRoutes.Patterns], access: AccessEnum.Auth },
    { name: AccountRoutes.PatternCard, path: [AccountRoutes.Account, AccountRoutes.PatternCard], prefix: ':id', access: AccessEnum.Auth },
];

export const AUTH_ROUTES: RouterConfig[] = [
    { name: AuthRoutes.Register, path: [AuthRoutes.Auth, AuthRoutes.Register] },
];

export function getStoreRoutePath(name: StoreRoutes): string {
    const route: RouterConfig | undefined = STORE_ROUTES.find((value: RouterConfig) => value.name === name);

    if(route === undefined) {
        return '';
    }
    let path: string = route.path.join('/');
    if(route.prefix) {
        path += '/' + route.prefix;
    }

    return path;
}

export function getAccountRoutePath(name: AccountRoutes): string {
    const route: RouterConfig | undefined = ACCOUNT_ROUTES.find((value: RouterConfig) => value.name === name);

    if(route === undefined) {
        return '';
    }
    let path: string = route.path.join('/');
    if(route.prefix) {
        path += '/' + route.prefix;
    }

    return path;
}


export function getStoreNavigatePath(name: StoreRoutes, id: number | undefined = undefined): string {
    const route: RouterConfig | undefined = STORE_ROUTES.find((value: RouterConfig) => value.name === name);

    if(route === undefined) {
        return '';
    }
    let path: string = '/' + route.path.join('/');
    if(route.prefix && typeof id === 'number') {
        path += '/' + id;
    }

    return path;
}
