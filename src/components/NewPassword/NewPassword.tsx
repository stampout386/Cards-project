import React, {ChangeEvent, memo, useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams, Navigate} from "react-router-dom";
import {setNewPasswordTC} from "../../redux/newPasswordReducer";
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import s from './NewPassword.module.css'
import {AppRootStateType} from "../../redux/store";

export const NewPassword = memo(() => {

    const info = useSelector<AppRootStateType, boolean>( state => state.newPassword.response)
    const dispatch = useDispatch()

    const [password, setPassword] = useState('')

    const {resetPasswordToken} = useParams<string>()

    const onclickHandler = useCallback( () => {
        // @ts-ignore
        dispatch<any>(setNewPasswordTC({ password ,resetPasswordToken }))
    } ,[password, resetPasswordToken, dispatch])

    const onchangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
    }, [setPassword])

    if (info) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={s.main}>
            <h3>Create new password</h3>
            <SuperInputText type={'password'} placeholder={'Password'} onChange={onchangePassword}/>
            <p>Create new password and we will send <br/> you further instructions to email</p>
            <SuperButton onClick={onclickHandler}>Create new password</SuperButton>
        </div>
    )
})