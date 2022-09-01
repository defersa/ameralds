import { IconsName } from "@am/cdk/icons/icons.service";

export enum SectionEnum {
    Account = 'account',
    Store = '',
    Auth = 'auth',
    Admin = 'admin'
}

export enum StoreRoutes {
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
    Goods = 'goods',
    Orders = 'orders',
    Patterns = 'patterns',
    PatternCard = 'pattern-card',
    Profile = 'profile'
}

export enum AuthRoutes {
    Registration = 'registration',
    Verify = 'verify'
}

export enum AdminRoutes {
    Goods = 'goods',
    Patterns = 'patterns',
    PatternCard = 'pattern-card',
    PatternEdit = 'pattern-edit',
    PatternAdd = 'pattern-add',
}

export enum AccessEnum {
    None = 'none',
    Auth = 'auth',
    Moder = 'moder'
}


export type AmstoreRouteEnum = StoreRoutes | AccountRoutes | AuthRoutes | AdminRoutes;


export type PartialRouterConfig = {
    path: AmstoreRouteEnum;
    prefix?: ':id';
    access?: AccessEnum;
    icon?: IconsName;
}

export type RouterConfig = {
    suffix: SectionEnum;
    pages: PartialRouterConfig[];
}


export const ROUTES_MAP: Record<SectionEnum, RouterConfig> = {
    [SectionEnum.Store]: {
        suffix: SectionEnum.Store,
        pages: [
            {
                path: StoreRoutes.Patterns,
                icon: 'pattern',
            },
            {
                path: StoreRoutes.PatternCard,
                prefix: ':id'
            },
            {
                path: StoreRoutes.PatternEdit,
                prefix: ':id',
                access: AccessEnum.Moder
            },
            {
                path: StoreRoutes.PatternAdd,
                access: AccessEnum.Moder
            },
            {
                path: StoreRoutes.Jewelrys,
                icon: 'jewelry'
            },
            {
                path: StoreRoutes.JewelryCard,
                prefix: ':id'
            },
            {
                path: StoreRoutes.JewelryEdit,
                prefix: ':id',
                access: AccessEnum.Moder
            },
            {
                path: StoreRoutes.JewelryAdd,
                access: AccessEnum.Moder
            },
            {
                path: StoreRoutes.Categories,
                access: AccessEnum.Moder
            },
            {
                path: StoreRoutes.CategoryAdd,
                access: AccessEnum.Moder
            },
            {
                path: StoreRoutes.CategoryEdit,
                prefix: ':id',
                access: AccessEnum.Moder
            },
            {
                path: StoreRoutes.Sizes,
                access: AccessEnum.Moder
            },
            {
                path: StoreRoutes.SizeAdd,
                access: AccessEnum.Moder
            },
            {
                path: StoreRoutes.SizeEdit,
                prefix: ':id',
                access: AccessEnum.Moder
            }]

    },
    [SectionEnum.Admin]: {
        suffix: SectionEnum.Admin,
        pages: [
            {path: AdminRoutes.Goods},
            {
                path: AdminRoutes.Patterns,
                icon: 'pattern',
            },
            {
                path: AdminRoutes.PatternCard,
                prefix: ':id'
            },
            {
                path: AdminRoutes.PatternEdit,
                prefix: ':id',
                access: AccessEnum.Moder
            },
            {
                path: AdminRoutes.PatternAdd,
                access: AccessEnum.Moder
            },
        ]
    },
    [SectionEnum.Account]: {
        suffix: SectionEnum.Account,
        pages: [
            {
                path: AccountRoutes.Profile,
                access: AccessEnum.Auth,
                icon: 'profile'
            },
            {
                path: AccountRoutes.Goods,
                icon: 'order'
            },
            {
                path: AccountRoutes.Orders,
                access: AccessEnum.Auth,
                icon: 'card'
            },
            {
                path: AccountRoutes.Patterns,
                access: AccessEnum.Auth,
                icon: 'pattern'
            },
            {
                path: AccountRoutes.PatternCard,
                prefix: ':id',
                access: AccessEnum.Auth
            }
        ]
    },
    [SectionEnum.Auth]: {
        suffix: SectionEnum.Auth,
        pages: [
            {path: AuthRoutes.Registration},
            {path: AuthRoutes.Verify},
        ]
    }

}

// export const ACCOUNT_ROUTES: RouterConfig[] = [
//     {
//         name: StoreRoutes.Store,
//         path: [],
//         icon: 'sale'
//     },
//     {
//         name: AccountRoutes.Profile,
//         path: [AccountRoutes.Account, AccountRoutes.Profile],
//         access: AccessEnum.Auth,
//         icon: 'profile'
//     },
//     {
//         name: AccountRoutes.Goods,
//         path: [AccountRoutes.Account, AccountRoutes.Goods],
//         icon: 'order'
//     },
//     {
//         name: AccountRoutes.Orders,
//         path: [AccountRoutes.Account, AccountRoutes.Orders],
//         access: AccessEnum.Auth,
//         icon: 'card'
//     },
//     {
//         name: AccountRoutes.Patterns,
//         path: [AccountRoutes.Account, AccountRoutes.Patterns],
//         access: AccessEnum.Auth,
//         icon: 'pattern'
//     },
//     {
//         name: AccountRoutes.PatternCard,
//         path: [AccountRoutes.Account, AccountRoutes.PatternCard],
//         prefix: ':id',
//         access: AccessEnum.Auth
//     },
// ];
//
// export const AUTH_ROUTES: RouterConfig[] = [
//     { name: AuthRoutes.Registration, path: [AuthRoutes.Auth, AuthRoutes.Registration] },
//     { name: AuthRoutes.Verify, path: [AuthRoutes.Auth, AuthRoutes.Verify] },
// ];
//
// export const ADMIN_ROUTES: RouterConfig[] = [
//     { name: AdminRoutes.Goods, path: [AdminRoutes.Admin, AdminRoutes.Goods] },
// ];


export function getStoreNavigatePath(name: AmstoreRouteEnum, id: number | undefined = undefined): string {
    let page: PartialRouterConfig | undefined;
    let suffix: SectionEnum | undefined;

    Object.values(ROUTES_MAP).find((section: RouterConfig) => {
        const current: PartialRouterConfig | undefined = section.pages.find((page: PartialRouterConfig) => page.path === name);
        if(current) {
            page = current;
            suffix = section.suffix;
        }
    });

    if (!page || !suffix) {
        return '';
    }

    let path: string = [suffix, page.path]
        .filter((item: string) => item)
        .map((key: string) => '/' + key)
        .join('');

    if (page.prefix && typeof id === 'number') {
        path += '/' + id;
    }

    return path;
}
