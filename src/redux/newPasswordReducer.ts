import {authAPI, newPasswordType} from "../api/loginAPI";
import {Dispatch} from "redux";
import {Error} from "./loginReducer";

const InitialState = {
    info: "",
    response: false
}

export const newPasswordReducer = (state: InitialStateType = InitialState, action: ActionsTypePassword): InitialStateType => {
    switch (action.type) {
        case 'INFO-IS-NEW-PASSWORD-SET':
            return {...state, info:action.payload.info}
        case 'NEW-PASSWORD-SET':
            return {...state, response: true}
        default :
            return state
    }
}

//actions
export const newPasswordInfo = (info: string) => ({type: 'INFO-IS-NEW-PASSWORD-SET', payload: {info}} as const)
export const isNewPasswordSet = () => ({type: 'NEW-PASSWORD-SET'} as const)

//thunks
export const setNewPasswordTC = (data: newPasswordType) => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.newPassword(data)
        dispatch(isNewPasswordSet())
        dispatch(newPasswordInfo(res.data.info))
    } catch (e: any) {
        dispatch(Error(e.response ? e.response.data.error : e.message))
    }
}

//types
type InitialStateType = typeof InitialState
type ActionsTypePassword = ReturnType<typeof newPasswordInfo> | ReturnType<typeof isNewPasswordSet>