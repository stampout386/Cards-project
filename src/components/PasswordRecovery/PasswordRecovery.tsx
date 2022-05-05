import React, {ChangeEvent, memo, useCallback, useState} from "react";
import s from "./PasswordRecovery.module.css"
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {Navigate} from "react-router-dom";
import {recoveryPasswordTC} from "../../redux/recoverPasswordReducer";

export const PasswordRecovery = memo(() => {

    const info = useSelector<AppRootStateType, boolean>( state => state.recoverPassword.response)
    const dispatch  = useDispatch()
    const [email, setEmail] = useState("")  //сюда свою почту
    const from = "test-front-admin <ai73a@yandex.by>"// здесь надо что-то написать, я из личного кабинета взяла
    const message = `<div style="background-color: lime; padding: 15px">
        password recovery link:
        <a href='http://localhost:3000/#/set-new-password/$token$'>
            link</a>
    </div>`//брала из лк

    const onchangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value), [setEmail])
    const onclickHandler = useCallback( () => {
        // @ts-ignore
        dispatch<any>(recoveryPasswordTC({ email, from, message }))
    } ,[email, from, message])

    if (info) {
        return <Navigate to={'/email'}/>
    }

    return (
        <div className={s.main}>
            <h3>Forgot your password?</h3>
            <SuperInputText type={'email'} placeholder={'Enter email'} onChange={onchangeEmail}/>
            <p>Enter your email address and we <br/> will send you further instructions</p>
            <SuperButton onClick={onclickHandler}>Send Instructions</SuperButton>
        </div>
    )
})