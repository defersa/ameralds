import { SectionsConfig } from "@am/shared/menu/menu.component";


export const adminConfig: SectionsConfig = {
    menu: {
        color: 'special',
        label: 'Админка',
        list: [
            {
                label: 'Схемы',
                path: ['/', 'admin', 'patterns'],
                icon: 'pattern',
            },
            {
                label: 'Размеры',
                path: ['/', 'admin', 'sizes'],
                icon: 'pattern',
            },
            {
                label: 'Категории',
                path: ['/', 'admin', 'categories'],
                icon: 'pattern',
            },
        ]
    }
}
