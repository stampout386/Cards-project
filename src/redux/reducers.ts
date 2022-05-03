import {ActionsTypeLogin} from "./loginReducer";
import {ActionTypeProfile} from "./profileReducer";
import {ActionTypeApp} from "./appReducer";

export const testPageReducer = (state: any, action: ActionType) => {
    switch (action.type) {
        default :
            return state
    }
}

export const errorPageReducer = (state: any, action: ActionType) => {
    switch (action.type) {
        default :
            return state
    }
}


export type ActionType = ActionsTypeLogin | ActionTypeProfile | ActionTypeApp
