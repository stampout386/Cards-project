import axios from "axios";

export const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export type getCardsType = {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}

//const packId = '60ae372b469a3a0004c7b7a0'

export const cardsAPI = {
    getCards: async (packId:string) => {
        const res = await instance.get(`/cards/card?cardsPack_id=${packId}&pageCount=200`)
        console.log(res)
    },
    addNewCard: async (card: {}) => {
        const res = await instance.post('/cards/card',{card})
        //console.log(res)
    },
    getPacks: async () => {
        const res = await instance.get('/cards/pack')
        //console.log(res)
    }
}

