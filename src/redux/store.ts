import {combineReducers} from "redux";
import {errorPageReducer, testPageReducer} from "./reducers";
import {profileReducer} from "./profileReducer";
import {loginReducer} from "./loginReducer";
import {newPasswordReducer} from "./newPasswordReducer";
import {recoverPasswordReducer} from "./recoverPasswordReducer";
import {legacy_createStore as createStore} from 'redux'


const rootReducer = combineReducers({
    profilePage: profileReducer,
    loginPage: loginReducer,
    newPassword: newPasswordReducer,
    recoverPassword: recoverPasswordReducer,
    testPage: testPageReducer,
    errorPage: errorPageReducer,

})

const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>;