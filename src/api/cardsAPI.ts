import axios from "axios";

export const instance = axios.create({
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})


export const cardsAPI = {
    signUp: async (payload: any) => {
        const response = await instance.post('/auth/register', payload)
        return response.data
    },
    packs() {
        return instance.get(`cards/pack`)
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
