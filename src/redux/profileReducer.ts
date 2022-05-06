import {Dispatch} from "redux";
import {setStatusApp} from "./appReducer";
import {authAPI} from "../api/loginAPI";

type initialStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}

const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0, // количество колод

    isAdmin: false,
    verified: false,// подтвердил ли почту
    rememberMe: false,

    error: '',
}

const SET_USER_DATA = 'SET_USER_DATA';


export const profileReducer = (state: initialStateType = initialState, action: ActionTypeProfile): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA : {
            return {
                ...state, _id: action.payload._id,
                email: action.payload.email,
                name: action.payload.name,
                avatar: action.payload.avatar,
                publicCardPacksCount: action.payload.publicCardPacksCount,
                rememberMe: action.payload.rememberMe,
                isAdmin: action.payload.isAdmin,
                verified: action.payload.verified,

            }
        }
        default :
            return state
    }
}

//action
export const setUserData = (data: any) => {
    const {_id, email, name, avatar, publicCardPacksCount, rememberMe, isAdmin, verified} = data;

    return {
        type: SET_USER_DATA,
        payload: {
            _id, email, name, avatar, publicCardPacksCount, rememberMe, isAdmin, verified
        }
    } as const
}
export const setNameTC = (name: string) => (dispatch: Dispatch) => {
    dispatch(setStatusApp('loading'));
    authAPI.rename({name, avatar: "https://illustrators.ru/uploads/illustration/image/1232594/main_ыыыы.png"})
        .then((res) => {
            setUserData(res.data.updatedUser)
            console.log(`ответ: ${res.data.updatedUser}`)
        }).catch((e) => {
        console.log(e)
    }).finally(() => {
        dispatch(setStatusApp('succeeded'))
    })
}


export type ActionTypeProfile = ReturnType<typeof setUserData>