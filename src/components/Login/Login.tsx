import React, {ChangeEvent, memo, useCallback, useState} from 'react'
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import {AppRootStateType} from "../../redux/store";
import {NavLink, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/loginReducer";
import s from "./Login.module.css"
import {Preloader} from "../common/Preloader/Preloader";
import {RequestStatusType} from "../../redux/appReducer";

export const Login = memo(() => {


    const dispatch = useDispatch()

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginPage.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const onchangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value), [setEmail])
    const onchangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value), [setPassword])
    const onclickHandler = useCallback(() => {
        dispatch<any>(login({email, password, rememberMe}))
    }, [email, password, rememberMe, dispatch])

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    if (status === 'loading') return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}><Preloader/></div>

    return (
        <div className={s.main}>
            <h3>Sign In</h3>
            <SuperInputText type={'email'} placeholder={'Enter email'} onChange={onchangeEmail}/>
            <SuperInputText type={'password'} placeholder={'Password'} onChange={onchangePassword}/>
            <SuperCheckbox onChangeChecked={setRememberMe}>Remember Me</SuperCheckbox>
            <NavLink to={'/passwordrecovery'}>Forgot Password</NavLink>
            <SuperButton onClick={onclickHandler}>Login</SuperButton>
            <NavLink to={'/register'}>Register</NavLink>
        </div>
    )
})