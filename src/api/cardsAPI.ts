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

const packId = '6278fc23f215af00044bde0d'

export const cardsAPI = {
    signUp: async (payload: any) => {
        const response = await instance.post('/auth/register', payload)
        return response.data
    },
    getCards: async () => {
        const res = await instance.get(`/cards/card?cardsPack_id=${packId}`)
        console.log(res)
    },
    getPacks: async () => {
        const res = await instance.get('/cards/pack')
        console.log(res)
    }
}

