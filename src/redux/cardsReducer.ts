import {Dispatch} from "redux";
import {setStatusApp} from "./appReducer";
import {cardsAPI} from "../api/cardsAPI";

export type cardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

type initialStateType = cardsType[]

const initialState = [{
    answer: "no answer",
    question: "no question",
    cardsPack_id: "",
    grade: 0,
    shots: 1,
    user_id: "",
    created: "",
    updated: "",
    _id: "",
},]

const SET_CARDS = 'SET_CARDS';
const ADD_NEW_CARD = 'ADD_NEW_CARD';
const GET_CARDS = 'GET_CARDS';


export const cardsReducer = (state: initialStateType = initialState, action: ActionTypeProfile): initialStateType => {
    switch (action.type) {
        case ADD_NEW_CARD : {
            return [...state,
                {
                    _id: action.payload._id,
                    answer: action.payload.answer,
                    question: action.payload.question,
                    cardsPack_id: action.payload.cardsPack_id,
                    grade: action.payload.grade,
                    shots: action.payload.shots,
                    user_id: action.payload.user_id,
                    created: action.payload.created,
                    updated: action.payload.updated
                }]
        }
        case GET_CARDS: {
            return [...action.payload]
        }
        default :
            return state
    }
}

//action
export const getCards = (cards: []) => {
    return {
        type: GET_CARDS,
        payload: cards
    } as const
}
export const addNewCard = (data: any) => {
    const {answer, question, cardsPack_id, grade, shots, user_id, created, updated, _id} = data;

    return {
        type: ADD_NEW_CARD,
        payload: {
            _id, answer, question, cardsPack_id, grade, shots, user_id, created, updated,
        }
    } as const
}

// const cardsPackId = '60ae372b469a3a0004c7b7a0'
export type cardType = {
    cardsPackId: string
    question: string
    answer: string
}
export const getCardsTC = (cardsPackId:string) => (dispatch: Dispatch) => {
    dispatch(setStatusApp('loading'));
    cardsAPI.getCards(cardsPackId)
        .then((res: any) => {
            console.log(res)
            dispatch(getCards(res.data.cards))
        }).catch((e) => {
        console.log(e)
    }).finally(() => {
        dispatch(setStatusApp('succeeded'))
    })
}
export const addNewCardsTC = (card:cardType) => (dispatch: Dispatch) => {
    dispatch(setStatusApp('loading'));
    cardsAPI.addNewCard(card)
        .then((res:any) => {
            dispatch(getCards(res.data.cards))
        }).catch((e) => {
        console.log(e)
    }).finally(() => {
        dispatch(setStatusApp('succeeded'))
    })
}

export type ActionTypeProfile = ReturnType<typeof getCards> | ReturnType<typeof addNewCard>