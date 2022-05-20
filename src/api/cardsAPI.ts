import axios from "axios";

export const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

// my=======
export type getCardsType = {
    cards: CardType[]
    error: string
}
export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string

    comments?: string
    more_id?: string
    rating?: number
    type?: string
    __v?: number
}

//const packId = '60ae372b469a3a0004c7b7a0'
//=============

export const cardsAPI = {
    getCards: async (packId: string) => {
        const res = await instance.get<getCardsType>(`/cards/card?cardsPack_id=${packId}&pageCount=200`)
        return res.data
    },
    addCard: async (card: any) => {
        const res = await instance.post<any>('/cards/card',{card})
        return res.data
    },
    deleteCard: async (id: string) => {
        const res = await instance.delete<any>('/cards/card?id='+id)
        return res.data
    },
    packs() {
        return instance.get(`cards/pack`+'?pageCount=100')
    },
    packsAdd(data: RequestPackType) {
        return instance.post(`cards/pack`, {cardsPack: data})
    },
    packDelete(id?: string) {
        return instance.delete(`cards/pack?id=${id}`)
    },
    packUpdate(data: { _id: string, name?: string }) {
        return instance.put(`cards/pack`, {cardsPack: data})
    },
}


export type RequestPackType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}

export type CardPacksType = {
    _id: string,
    user_id: string,
    user_name: string,
    private: boolean,
    name: string,
    path: string,
    grade: number,
    shots: number,
    cardsCount: number,
    type: string,
    rating: number,
    created: string,
    updated: string,
    more_id: string,
    __v: number
}
