type initialStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод

    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;

    error?: string;
}

const initialState = {
    _id: '',
    email: '',
    name: '',
    avatar: '',
    publicCardPacksCount: 0, // количество колод

    isAdmin: false,
    verified: false,// подтвердил ли почту
    rememberMe: false,

    error: '',
}

const SET_USER_DATA = 'SET_USER_DATA';


export const profileReducer = (state: initialStateType = initialState, action: ActionTypeProfile): initialStateType => {
    switch (action.type) {
        case SET_USER_DATA : {
            return {
                ...state, _id: action.payload._id,
                email: action.payload.email,
                name: action.payload.name,
                avatar: action.payload.avatar,
                publicCardPacksCount: action.payload.publicCardPacksCount
            }
        }
        default :
            return state
    }
}

//action
export const setUserData = (data:any) => {
    const {_id, email, name, avatar, publicCardPacksCount} = data;

    return {
        type: SET_USER_DATA,
        payload: {
            _id, email, name, avatar, publicCardPacksCount
        }
    } as const
}


export type ActionTypeProfile = ReturnType<typeof setUserData>