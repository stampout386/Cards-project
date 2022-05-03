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
    }

}

