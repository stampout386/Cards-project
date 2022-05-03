import {applyMiddleware, combineReducers} from "redux";
import {errorPageReducer, testPageReducer} from "./reducers";
import {loginReducer} from "./loginReducer";
import {newPasswordReducer} from "./newPasswordReducer";
import {recoverPasswordReducer} from "./recoverPasswordReducer";
import {legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk';
import {profileReducer} from "./profileReducer";


const rootReducer = combineReducers({
    loginPage: loginReducer,
    profilePage: profileReducer,
    // newPassword: newPasswordReducer,
    // recoverPassword: recoverPasswordReducer,
    // testPage: testPageReducer,
    // errorPage: errorPageReducer,

})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>;