import {applyMiddleware, combineReducers} from "redux";
import {ActionType, errorPageReducer, testPageReducer} from "./reducers";
import {ActionsTypeLogin, loginReducer} from "./loginReducer";
import {newPasswordReducer} from "./newPasswordReducer";
import {recoverPasswordReducer} from "./recoverPasswordReducer";
import {legacy_createStore as createStore} from 'redux'
import thunk, {ThunkAction} from 'redux-thunk';
import {profileReducer} from "./profileReducer";
import {appReducer} from "./appReducer";
import {packsReducer} from "./packsReducer";
import {cardsReducer} from "./cardsReducer";


const rootReducer = combineReducers({
    loginPage: loginReducer,
    profilePage: profileReducer,
    app: appReducer,
    newPassword: newPasswordReducer,
    recoverPassword: recoverPasswordReducer,
    packs: packsReducer,
    cardsPage: cardsReducer
    // testPage: testPageReducer,
    // errorPage: errorPageReducer,

})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>;


// @ts-ignore
window.store = store;