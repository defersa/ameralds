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
            'account': 'Личный кабинет',
            'patterns': 'Схемы',
            'pattern-card': 'Карточка схемы',
            'pattern-edit': 'Изменение схемы',
            'pattern-add': 'Добавление схемы',
            'jewelrys': 'Карточка украшения',
            'jewelry-card': 'Карточка украшения',
            // 'jewelry-edit': 'Изменение украшения',
            'jewelry-add': 'Добавление украшения',
            'images': 'Изображения',
        },
        account: {
            '': 'Главная',
            'account': 'Личный кабинет',
            'goods': 'Корзина',
            'orders': 'Заказы',
            'patterns': 'Купленные схемы',
            'pattern-card': 'Купленная схема'
        }
    }
}
