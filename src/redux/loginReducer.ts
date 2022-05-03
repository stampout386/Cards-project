import {authAPI, LoginParamsType} from "../api/loginAPI";
import {Dispatch} from "redux";
import {setUserData} from "./profileReducer";
import {ActionType} from "./reducers";

const InitialState = {
    isLoggedIn: false,
    error: '',
}

export const loginReducer = (state: InitialStateType = InitialState, action: ActionsTypeLogin): InitialStateType => {
    switch (action.type) {
        case 'LOGGED-IN':
        case 'ERROR':
            return {...state, ...action.payload}
        default :
            return state
    }
}

// actions
export const LoggedIn = (isLoggedIn: boolean) => ({type: 'LOGGED-IN', payload: {isLoggedIn}} as const)
const Error = (error: string) => ({type: 'ERROR', payload: {error}} as const)

// thunks
export const login = (data: LoginParamsType) => async (dispatch: Dispatch<ActionType>) => {
    try {
        const res = await authAPI.login(data)
        dispatch(setUserData(res.data)) //из профайл-редьюсера где идёт set всех данных юзера
        dispatch(LoggedIn(true))

    } catch (e: any) {
        dispatch(Error(e.response ? e.response.data.error : e.message))
    }
}

export const logout = () => (dispatch: Dispatch<ActionType>) => {
    authAPI.logout()
        .then(() => {
            dispatch(LoggedIn(false))
        }).catch((e) => {
        dispatch(Error(e.response ? e.response.data.error : e.message))
    })
}

// types
type InitialStateType = typeof InitialState
export type ActionsTypeLogin = ReturnType<typeof LoggedIn> | ReturnType<typeof Error>

