import React from "react";
import style from './Profile.module.css'
import SuperButton from "../common/SuperButton/SuperButton";

export function Profile() {
    return <div className={style.container}>
        Personal information
        <div>
            <img src="https://cspromogame.ru//storage/upload_images/avatars/1299.jpg" alt="" className={style.avatar}/>
        </div>
        <div>
            <div className={style.description}>Nickname</div>
            <div>Mik</div>
        </div>
        <div>
            <div className={style.description}>Email</div>
            <div>Mik@gmail.com</div>
        </div>
        <div className={style.buttons}>

            <SuperButton className={style.button}>Log out</SuperButton>
            <SuperButton className={style.button}>Save</SuperButton>
        </div>

    </div>;
}