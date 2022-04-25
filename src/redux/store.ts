import {combineReducers, createStore} from "redux";
import {errorPageReducer, loginReducer, newPasswordReducer, profileReducer, recoverPasswordReducer, testPageReducer} from "./reducers";


const rootReducer = combineReducers({
    profilePage: profileReducer,
    loginPage: loginReducer,
    newPassword: newPasswordReducer,
    recoverPassword:recoverPasswordReducer,
    testPage: testPageReducer,
    errorPage: errorPageReducer,

})

const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>;