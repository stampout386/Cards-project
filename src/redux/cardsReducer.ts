import {Dispatch} from "redux";
import {setStatusApp} from "./appReducer";
import {cardsAPI, CardType} from "../api/cardsAPI";


type initialStateType = CardType[]

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

export type addCardType = {
    cardsPack_id: string
    question: string
    answer: string
}
export type ActionsType =
    ReturnType<typeof getCards>
    | ReturnType<typeof addNewCardAC>
    | ReturnType<typeof setStatusApp>

const ADD_CARD = 'ADD_CARD';
const GET_CARDS = 'GET_CARDS';


export const cardsReducer = (state: initialStateType = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case GET_CARDS: {
            return [...action.payload]
        }
        default :
            return state
    }
}

//actions
export const getCards = (cards: []) => {
    return {
        type: GET_CARDS,
        payload: cards
    } as const
}
export const addNewCardAC = (data: addCardType) => {
    const {answer, question, cardsPack_id} = data;

    return {
        type: ADD_CARD,
        payload: {
            answer, question, cardsPack_id
        }
    } as const
}

//thunks
export const getCardsTC = (cardsPackId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusApp('loading'));
    cardsAPI.getCards(cardsPackId)
        .then((res: any) => {
            dispatch(getCards(res.cards))
        }).catch((e) => {
        console.log(e)
    }).finally(() => {
        dispatch(setStatusApp('succeeded'))
    })
}
export const deleteCardTC = (card: CardType) => (dispatch: Dispatch) => {
    try {
        cardsAPI.deleteCard(card._id)
        dispatch<any>(getCardsTC(card.cardsPack_id))
    } catch {
        Error('some error occurred !')
    }
}
export const addCardsTC = (card: addCardType) => (dispatch: Dispatch) => {
    try {
        cardsAPI.addCard(card)
        dispatch<any>(getCardsTC(card.cardsPack_id))
    } catch {
        Error('some error occurred !')
    }
}
