import {AppRootStateType} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {CardPacksType, cardsAPI, RequestPackType} from "../api/cardsAPI";
import {message} from "antd";

const initialState = {
    cardPacks: [] as Array<CardPacksType>,
    cardsPack_id: '',
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 8,
    packName: '',
    min: 0,
    max: 0,
    isLoading: false
}


export const packsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'GET-CARDS-PACK':
            return {...state, cardPacks: action.data}
        case 'CARDS-PACK-ID':
            return {...state, cardsPack_id: action.value}
        case 'LOADING':
            return {...state, isLoading: action.isLoading}
        case "SET-FILTERED-PACKS":
            return {...state, packName: action.packName}
        case "SET-MIN":
            return {...state, min: action.min}
        case "SET-MAX":
            return {...state, max: action.max}
        default:
            return state
    }
}

//actions
export const cardPacksAC = (data: Array<CardPacksType>) => ({ type: 'GET-CARDS-PACK', data } as const )
export const currentPackIdAC = (value: string) => ({ type: 'CARDS-PACK-ID', value } as const )
export const packsLoaderAC = (isLoading: boolean) => ({ type: 'LOADING', isLoading} as const)
export const setFilteredPacksAC = (packName: string) => ({type: 'SET-FILTERED-PACKS', packName} as const)
export const setMinAC = (min: number) => ({type: 'SET-MIN', min} as const)
export const setMaxAC = (max: number) => ({type: 'SET-MAX', max} as const)

//thunks
export const getPacksTC = ():ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    dispatch(packsLoaderAC(true))
    cardsAPI.packs()
        .then((res) => {
            dispatch(cardPacksAC(res.data.cardPacks))
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            message.error(error)
        })
        .finally(() => {
            dispatch(packsLoaderAC(false))
        })
}

export const addPackTC = (data: RequestPackType):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    dispatch(packsLoaderAC(true))
    cardsAPI.packsAdd(data)
        .then((res) => {
            dispatch(getPacksTC())
            message.info(`New pack has been added`)
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            message.error(error)
        })
        .finally(() => {
            dispatch(packsLoaderAC(false))
        })
}
export const updatePackTC = (data: {_id: string, name: string}):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    dispatch(packsLoaderAC(true))
    cardsAPI.packUpdate(data)
        .then((res) => {
            dispatch(getPacksTC())
            message.info(`Pack name has been updated`)
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            message.error(error)
        })
        .finally(() => {
            dispatch(packsLoaderAC(false))
        })
}
export const deletePackTC = (id?: string):ThunkType => (dispatch: ThunkDispatch<AppRootStateType, unknown, ActionsType>) => {
    dispatch(packsLoaderAC(true))
    cardsAPI.packDelete(id)
        .then((res) => {
            dispatch(getPacksTC())
            message.info(`Pack has been deleted`)
        })
        .catch((e) => {
            const error = e.response
                ? e.response.data.error
                : (e.message + ', more details in the console')
            message.error(error)
        })
        .finally(() => {
            dispatch(packsLoaderAC(false))
        })
}

//types
export type InitialStateType = typeof initialState
type ActionsType = ReturnType<typeof cardPacksAC>
    | ReturnType<typeof currentPackIdAC>
    | ReturnType<typeof packsLoaderAC>
    |ReturnType<typeof setFilteredPacksAC>
    |ReturnType<typeof setMinAC>
    |ReturnType<typeof setMaxAC>
type ThunkType = ThunkAction<void, AppRootStateType, unknown, ActionsType>