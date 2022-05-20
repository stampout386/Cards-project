import {NavLink} from "react-router-dom";
import React from "react";
import s from './MyMenu.module.css'

export function MyMenu() {
    return (
        <div>
            <NavLink className={({isActive}) => (isActive ? s.active : s.item)} to={'/'}>Profile</NavLink>
            <NavLink className={({isActive}) => (isActive ? s.active : s.item)} to={'/login'}>Login</NavLink>
            <NavLink className={({isActive}) => (isActive ? s.active : s.item)} to={'/register'}>Register</NavLink>
            <NavLink className={({isActive}) => (isActive ? s.active : s.item)} to={'/error404'}>Error</NavLink>
            <NavLink className={({isActive}) => (isActive ? s.active : s.item)} to={'/passwordrecovery'}>Password Recovery</NavLink>
            <NavLink className={({isActive}) => (isActive ? s.active : s.item)} to={'/newpassword'}>New Password</NavLink>
            <NavLink className={({isActive}) => (isActive ? s.active : s.item)} to={'/test'}>Test</NavLink>
            <NavLink className={({isActive}) => (isActive ? s.active : s.item)} to={'/packs'}>Packs</NavLink>
        </div>

    );
}