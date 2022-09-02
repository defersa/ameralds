export enum StoreRoutes  {
    Store = '',
    Patterns = 'patterns',
    PatternCard = 'pattern-card/:id',
    PatternEdit = 'pattern-edit/:id',
    PatternAdd = 'pattern-add',
    Jewelrys = 'jewelrys',
    JewelryCard = 'jewelry-card/:id',
    JewelryAdd = 'jewelry-add',
    Images = 'images'
}

export enum AccountRoutes {
    Account = 'account',
    Goods = 'goods',
    Orders = 'orders',
    Patterns = 'patterns',
    Profile  = 'profile',
    PatternCard = 'pattern-card/:id',
}

export enum AuthRoutes {
    Auth = 'auth',
    Registration = 'registration',
    Verify = 'verify'
}
