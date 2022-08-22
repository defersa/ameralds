import { StoreRoutes, AccountRoutes, SectionEnum, AuthRoutes, AdminRoutes } from "./router-builder";

export type LangDictionary = {
    routes: {
        [SectionEnum.Store]: {
            [key in StoreRoutes]: string;
        },
        [SectionEnum.Account]: {
            [key in AccountRoutes]: string;
        },
        [SectionEnum.Admin]: {
            [key in AdminRoutes]: string;
        },
        [SectionEnum.Auth]: {
            [key in AuthRoutes]: string;
        }
    }
}

export const RU_LANG: LangDictionary = {
    routes: {
        [SectionEnum.Store]: {
            'patterns': 'Схемы',
            'pattern-card': 'Карточка схемы',
            'pattern-edit': 'Изменение схемы',
            'pattern-add': 'Добавление схемы',
            'jewelrys': 'Украшения',
            'jewelry-card': 'Карточка украшения',
            // 'jewelry-edit': 'Изменение украшения',
            'jewelry-add': 'Добавление украшения',
            'categories': 'Категории',
            'category-edit': 'Изменить категорию',
            'category-add': 'Создать категорию',
            'sizes': 'Размеры',
            'size-edit': 'Изменить размер',
            'size-add': 'Создать размер'
        },
        [SectionEnum.Account]: {
            'goods': 'Корзина',
            'orders': 'Заказы',
            'patterns': 'Купленные схемы',
            'pattern-card': 'Купленная схема',
            'profile': 'Профиль'
        },
        [SectionEnum.Auth]: {
            [AuthRoutes.Registration]: 'Регистрация',
            [AuthRoutes.Verify]: 'Подтверждение',
        },
        [SectionEnum.Admin]: {
            [AdminRoutes.Goods]: 'Корзина админа',
        }
    }
}

export const EN_LANG: LangDictionary = {
    routes: {
        [SectionEnum.Store]: {
            'patterns': 'Patterns',
            'pattern-card': 'Pattern',
            'pattern-edit': 'Pattern edit',
            'pattern-add': 'Pattern add',
            'jewelrys': 'Jewelries',
            'jewelry-card': 'Jewelry',
            // 'jewelry-edit': 'Изменение украшения',
            'jewelry-add': 'Jewelry add',
            'categories': 'Categories',
            'category-edit': 'Category edit',
            'category-add': 'Category add',
            'sizes': 'Sizes',
            'size-edit': 'Edit size',
            'size-add': 'Add size'
        },
        [SectionEnum.Account]: {
            'goods': 'Goods',
            'orders': 'Orders',
            'patterns': 'Bought patterns',
            'pattern-card': 'Pattern',
            'profile': 'Profile'
        },
        [SectionEnum.Auth]: {
            [AuthRoutes.Registration]: 'Registration',
            [AuthRoutes.Verify]: 'Verify',
        },
        [SectionEnum.Admin]: {
            [AdminRoutes.Goods]: 'Admin goods',
        }
    }
}
