import React, {useState} from "react";
import style from './Profile.module.css'
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {Navigate} from "react-router-dom";
import {logout} from "../../redux/loginReducer";
import {setUserData} from "../../redux/profileReducer";
import {authAPI} from "../../api/loginAPI";


export function Profile() {
    const isLoggedIn = useSelector<AppRootStateType>(state => state.loginPage.isLoggedIn)
    const {name, email, avatar, publicCardPacksCount}: any = useSelector<AppRootStateType>(state => state.profilePage)
    const dispatch = useDispatch<any>();

    const logoutClick = () => {
        dispatch(logout())
    }

    const saveData = () => {
        alert('save new data')
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return <div className={style.container}>
        Personal information
        <div>
            <img src={avatar} alt="" className={style.avatar}/>
        </div>
        <div>
            <div className={style.description}>Nickname</div>
            <div>{name}</div>
        </div>
        <div>
            <div className={style.description}>Email</div>
            <div>{email}</div>
        </div>
        <div>
            <div className={style.description}>Cards Count</div>
            <div>{publicCardPacksCount}</div>
        </div>
        <div className={style.buttons}>

            <SuperButton className={style.button} onClick={logoutClick}>Log out</SuperButton>
            <SuperButton className={style.button} onClick={saveData}>Save</SuperButton>
        </div>

    </div>;
}