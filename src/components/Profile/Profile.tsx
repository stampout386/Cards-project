import React, {useState} from "react";
import style from './Profile.module.css'
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {Navigate} from "react-router-dom";
import {logout} from "../../redux/loginReducer";
import {Preloader} from "../common/Preloader/Preloader";
import SuperInputText from "../common/SuperInput/SuperInputText";
import {setNameTC} from "../../redux/profileReducer";


export const Profile = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginPage.isLoggedIn)
    const {name, email, avatar, publicCardPacksCount} = useSelector<AppRootStateType, any>(state => state.profilePage)
    const status = useSelector<AppRootStateType, string>(state => state.app.status)
    const dispatch = useDispatch<any>();
    const [isRename, setIsRename] = useState<boolean>(false)
    const [newName, setNewName] = useState<string>(name)
    const logoutClick = () => {
        dispatch(logout())
    }

    const saveData = () => {
        dispatch(setNameTC(newName))
        if (isRename) {
            setIsRename(!isRename)
        }

    }

    const rename = () => {
        setIsRename(!isRename)
    }
    const onChangeInput = (e: any) => {
        setNewName(e.currentTarget.value)
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    if (status === 'loading') return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
        <Preloader/></div>


    return <div className={style.container}>
        <h3>Personal information</h3>
        <div>
            <img src={avatar} alt="" className={style.avatar}/>
        </div>
        <div>
            <div className={style.description}>Nickname</div>
            <div>
                {!isRename && <span>{name}</span>}
                {isRename && <SuperInputText onChange={onChangeInput} value={newName}/>}
                <div>
                    <SuperButton onClick={rename}
                                 className={style.buttonsRename}>{isRename ? 'Cancel' : 'Rename'}</SuperButton>
                    {isRename && <SuperButton className={style.buttonsRename} onClick={saveData}>Save</SuperButton>}
                </div>

            </div>
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

        </div>

    </div>;
}