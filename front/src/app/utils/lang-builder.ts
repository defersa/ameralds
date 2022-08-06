import { StoreRoutes, AccountRoutes } from "./router-builder";

export type LangDictionary = {
    routes: {
        store: {
            [key in StoreRoutes]: string;
        },
        account: {
            [key in AccountRoutes]: string;
        }
    }
}

export const RU_LANG: LangDictionary = {
    routes: {
        store: {
            '': 'Главная',
            'account': 'Аккаунт',
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
        account: {
            '': 'Главная',
            'account': 'Личный кабинет',
            'goods': 'Корзина',
            'orders': 'Заказы',
            'patterns': 'Купленные схемы',
            'pattern-card': 'Купленная схема',
            'profile': 'Профиль'
        }
    }
}

export const EN_LANG: LangDictionary = {
    routes: {
        store: {
            '': 'Main',
            'account': 'Personal',
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
        account: {
            '': 'Main',
            'account': 'Account',
            'goods': 'Goods',
            'orders': 'Orders',
            'patterns': 'Bought patterns',
            'pattern-card': 'Pattern',
            'profile': 'Profile'
        }
    }
}
