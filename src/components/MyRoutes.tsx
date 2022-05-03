import {Route, Routes} from "react-router-dom";
import {Profile} from "./Profile/Profile";
import {Login} from "./Login/Login";
import {ErrorPage} from "./ErrorPage/ErrorPage";
import {PasswordRecovery} from "./PasswordRecovery/PasswordRecovery";
import {NewPassword} from "./NewPassword/NewPassword";
import {Test} from "./Test/Test";
import React from "react";
import {Register} from "./Register/Register";

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
            </Routes>
        </div>
    );
}