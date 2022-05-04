import {ActionType} from "./reducers";
import {Dispatch} from "redux";
import {authAPI} from "../api/loginAPI";
import {setUserData} from "./profileReducer";
import {LoggedIn} from "./loginReducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type initialStateType = {
    status: RequestStatusType
    isInitialized: boolean

}

const initialState: initialStateType = {
    status: "idle",
    isInitialized: false,
}

const SET_INITIAL_APP = 'SET_INITIAL_APP';
const SET_STATUS_APP = 'SET_STATUS_APP'

export const appReducer = (state = initialState, action: ActionType): initialStateType => {
    switch (action.type) {
        case SET_STATUS_APP:
            return {
                ...state, status: action.status
            }

        case SET_INITIAL_APP:
            return {
                ...state, isInitialized: action.isInitialized
            }
        default: {
            return state
        }
    }
}
export const setStatusApp = (status: RequestStatusType) => {
    return {
        type: SET_STATUS_APP,
        status
    } as const
}
export const setInitialApp = (isInitialized: boolean) => {
    return {
        type: SET_INITIAL_APP,
        isInitialized
    } as const
}

export type ActionTypeApp = ReturnType<typeof setInitialApp> | ReturnType<typeof setStatusApp>

export const initializeAppTC = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setStatusApp('loading'))
    authAPI.me()
        .then((res) => {
            dispatch(setUserData(res.data))
            dispatch(LoggedIn(true))
        }).catch((e) => {
        console.log(e)
    }).finally(() => {
        dispatch(setInitialApp(true))
        dispatch(setStatusApp('succeeded'))
    })
}