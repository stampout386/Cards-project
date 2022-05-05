import {authAPI, passwordRecoveryType} from "../api/loginAPI";
import {Dispatch} from "redux";
import {Error} from "./loginReducer";


const InitialState = {
    info: "",
    response: true
}

export const recoverPasswordReducer = (state: InitialStateType = InitialState, action: ActionsTypePassword): InitialStateType => {
    switch (action.type) {
        case 'PASSWORD-RECOVERY':
            return {...state, response: action.value}
        case 'INFO-IS-PASSWORD-RECOVERY':
            return {...state, info: action.info}
        default :
            return state
    }
}

//actions
export const isPasswordRecovery = (value: boolean) => ({type: 'PASSWORD-RECOVERY', value} as const)
export const recoveryInfo = (info: string) => ({type: 'INFO-IS-PASSWORD-RECOVERY', info} as const)

//thunks
export const recoveryPasswordTC = (data: passwordRecoveryType) => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.passwordRecovery(data)
        dispatch(isPasswordRecovery(true))
        dispatch(recoveryInfo(res.data.info))
    } catch (e: any) {
        dispatch(isPasswordRecovery(false))
        dispatch(Error(e.response ? e.response.data.error : e.message))
    }
}

//types
type InitialStateType = typeof InitialState
type ActionsTypePassword = ReturnType<typeof isPasswordRecovery> | ReturnType<typeof recoveryInfo>