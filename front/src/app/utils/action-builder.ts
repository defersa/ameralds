import { environment } from "src/environments/environment";


export enum HttpActions {
    Profile = 'profile',
    Patterns = 'patterns',
    Pattern = 'pattern',
    PatternEdit = 'pattern-edit',
    AddProduct = 'add-product',
    RemoveProduct = 'remove-product',

    UploadImage = 'upload-image-file',
    GetImages = 'get-images',

    GoodsBuy = 'goods-buy',

    GetOrders = 'get-orders',
    GetOwnPatterns = 'get-own-patterns',

    Category = 'category',
    Categies = 'categories',
    AllCategies = 'categories-all',

    Size = 'size',
    Sizes = 'sizes',
    AllSizes = 'sizes-all',

    PatternSizeFile = 'pattern-size-file',
    PatternColorsFile = 'pattern-colors-file',
    PatternDownloadSizeFile = 'pattern-download-size-file',
    PatternDownloadColorsFile = 'pattern-download-colors-file',

    SendMail = 'send-mail',
}

export enum HttpAuthActions {
    GetToken = 'token-auth',
    RefreshToken = 'token-refresh'
}

export enum HttpRootFragments {
    Core = '/',
    Api = '/api/'
}

type ActionsUnit = HttpActions | HttpAuthActions;

export function getAction(action: ActionsUnit, root: HttpRootFragments = HttpRootFragments.Api): string {
    return environment.endpoint + root + action + '/';
}
export function getStaticUrl(url: string): string {
    return environment.endpoint + url;
}
