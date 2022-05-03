import {authAPI, LoginParamsType} from "../api/loginAPI";
import {Dispatch} from "redux";

const InitialState = {
    isLoggedIn: false,
    error: '',
}

export const loginReducer = (state: InitialStateType = InitialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'LOGGED-IN':
        case 'ERROR':
            return {...state, ...action.payload}
        default :
            return state
    }
}

// actions
const LoggedIn = (isLoggedIn: boolean) => ({type: 'LOGGED-IN', payload: {isLoggedIn}} as const)
const Error = (error: string) => ({type: 'ERROR', payload: {error}} as const)

// thunks
export const login = (data: LoginParamsType) => async (dispatch:Dispatch<ActionsType>) => {
    try {
        const res = await authAPI.login(data)
        dispatch(LoggedIn(true))
        // dispatch(setUserData(res)) из профайл-редьюсера где идёт set всех данных юзера
    } catch (e: any) {
        dispatch(Error(e.response ? e.response.data.error : e.message))
    }
}

// types
type InitialStateType = typeof InitialState
type ActionsType = ReturnType<typeof LoggedIn>| ReturnType<typeof Error>

