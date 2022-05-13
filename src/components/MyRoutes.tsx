import {Route, Routes} from "react-router-dom";
import {Profile} from "./Profile/Profile";
import {Login} from "./Login/Login";
import {ErrorPage} from "./ErrorPage/ErrorPage";
import {PasswordRecovery} from "./PasswordRecovery/PasswordRecovery";
import {NewPassword} from "./NewPassword/NewPassword";
import {Test} from "./Test/Test";
import React from "react";
import {Register} from "./Register/Register";
import {Email} from "./common/Email/Email";
import {Packs} from "./Packs list/Packs";

export function MyRoutes() {
    return (
        <div>
            <Routes>
                <Route path={'/cards-project'} element={<Profile/>}/>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/error404'} element={<ErrorPage/>}/>
                <Route path={'passwordrecovery'} element={<PasswordRecovery/>}/>
                <Route path={'newpassword'} element={<NewPassword/>}/>
                <Route path={'test'} element={<Test/>}/>
                <Route path={'/email'} element={<Email/>}/>
                <Route path={'/packs'} element={<Packs/>}/>
            </Routes>
        </div>
    );
}