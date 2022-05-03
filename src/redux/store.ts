import {applyMiddleware, combineReducers} from "redux";
import {errorPageReducer, testPageReducer} from "./reducers";
import {profileReducer} from "./profileReducer";
import {loginReducer} from "./loginReducer";
import {newPasswordReducer} from "./newPasswordReducer";
import {recoverPasswordReducer} from "./recoverPasswordReducer";
import {legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
    profilePage: profileReducer,
    loginPage: loginReducer,
    newPassword: newPasswordReducer,
    recoverPassword: recoverPasswordReducer,
    testPage: testPageReducer,
    errorPage: errorPageReducer,

})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>;