import { PatternMaxType } from "@am/interface/pattern.interface";

export const EMPTY_PATTERN: PatternMaxType = {
    id: 0,
    name: { ru: '', en: '' },
    price: { ru: 0, en: 0 },
    description: '',
    sizes: [],
    colors: { id: 0 },
    create_date: '',
    hidden: false,
    images: [],
    category: []
}
