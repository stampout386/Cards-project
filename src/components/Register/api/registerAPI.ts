import {instance} from "../../../api/cardsAPI";

export const registerAPI = {
    signUp: async (payload:any) => {
        const response = await instance.post('/auth/register', payload)
        return response.data
    }
}