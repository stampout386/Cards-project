import React from "react";
import style from './Profile.module.css'
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {Navigate} from "react-router-dom";
import {logout} from "../../redux/loginReducer";
import {Preloader} from "../common/Preloader/Preloader";


export function Profile() {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginPage.isLoggedIn)
    const {name, email, avatar, publicCardPacksCount} = useSelector<AppRootStateType, any>(state => state.profilePage)
    const status = useSelector<AppRootStateType, string>(state => state.app.status)
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

    if (status === 'loading') return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}><Preloader/></div>


    return <div className={style.container}>
        Personal information
        <div>
            <img src={avatar} alt="" className={style.avatar}/>
        </div>
        <div>
            <div className={style.description}>Nickname</div>
            <div><span>{name}</span></div>
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