
export interface ISmallProfile {
    username: string;
    email: string;
    godmode: boolean;
    goods: any;
    patterns: { id: number }[];
}

export type AuthRequestPayload = {
    username: string;
    password: string;
}

export type AuthResponse = {
    error?: string;
    token?: string;
}

export type ProfileInterfaceResponse = {
    user: {
        id: number;
        username: string;
        email: string;
        date_joined: string;
        is_staff: boolean;
        person: {
            verify: boolean;
            location: 'ru' | 'en';
        }
    }
}

export type ProfileInterface = {
    id: number;
    username: string;
    email: string;
    dateJoined: string;
    isStaff: boolean;
    person: {
        verify: boolean;
        location: 'ru' | 'en';
    }
}
