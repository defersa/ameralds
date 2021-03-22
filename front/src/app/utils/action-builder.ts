import { environment } from "src/environments/environment";


export enum HttpActions {
    Profile = 'profile',
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
