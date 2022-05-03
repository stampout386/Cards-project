import {combineReducers} from "redux";
import {errorPageReducer, testPageReducer} from "./reducers";
import {loginReducer} from "./loginReducer";
import {newPasswordReducer} from "./newPasswordReducer";
import {recoverPasswordReducer} from "./recoverPasswordReducer";
import {legacy_createStore as createStore} from 'redux'


const rootReducer = combineReducers({
    loginPage: loginReducer,
    // newPassword: newPasswordReducer,
    // recoverPassword: recoverPasswordReducer,
    // testPage: testPageReducer,
    // errorPage: errorPageReducer,

})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>;