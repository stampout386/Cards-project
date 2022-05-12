import {instance} from "./cardsAPI";

export const authAPI = {

    login(data: LoginParamsType) {
        return instance.post<UserDataType>('auth/login', data)
    },
    logout() {
        return instance.delete('auth/me')
    },
    me() {
        return instance.post('auth/me')
    },
    rename(date:any){
        return instance.put('auth/me',date)
    },
    newPassword(data: newPasswordType) {
        return instance.post<ResponseType>('auth/set-new-password', data)
    },
    passwordRecovery(data: passwordRecoveryType) {
        return  instance.post<ResponseType>('auth/forgot', data)
    },
    signUp: async (payload: any) => {
        const response = await instance.post('/auth/register', payload)
        return response.data
    },
}


export type LoginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean
}

export type UserDataType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
}

export type newPasswordType = {
    password: string
    resetPasswordToken: string
}

export type passwordRecoveryType = {
    email: string,
    from: string,
    message: string
}

export type ResponseType = {
    info: string
    error: string
}