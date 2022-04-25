import {Route, Routes} from "react-router-dom";
import {Profile} from "./Profile";
import {Login} from "./Login";
import {ErrorPage} from "./ErrorPage";
import {PasswordRecovery} from "./PasswordRecovery";
import {NewPassword} from "./NewPassword";
import {Test} from "./Test";
import React from "react";

export function MyRoutes() {
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<Profile/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/error404'} element={<ErrorPage/>}/>
                <Route path={'passwordrecovery'} element={<PasswordRecovery/>}/>
                <Route path={'newpassword'} element={<NewPassword/>}/>
                <Route path={'test'} element={<Test/>}/>
            </Routes>
        </div>
    );
}