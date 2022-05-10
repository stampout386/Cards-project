import React, {ChangeEvent, memo, useCallback, useState} from 'react'
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import {AppRootStateType} from "../../redux/store";
import {NavLink, Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Error, login} from "../../redux/loginReducer";
import s from "./Login.module.css"
import {Preloader} from "../common/Preloader/Preloader";
import {RequestStatusType} from "../../redux/appReducer";

export const Login = memo(() => {

    const error = useSelector<AppRootStateType, string>(state => state.loginPage.error)
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

    const errorHandler = () => {
        dispatch(Error(''))
    }

    return (
        <div className={s.main}>
            {status === 'loading' &&
                <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}><Preloader/></div>}

            <h3>Sign In</h3>
            <SuperInputText type={'email'}
                            placeholder={'Enter email'}
                            onChange={onchangeEmail}
                            onClick={errorHandler}/>
            <SuperInputText type={'password'}
                            placeholder={'Password'}
                            onChange={onchangePassword}
                            onClick={errorHandler}/>
            {error && <div className={s.error}>{error}</div>}
            <div className={s.action}>
                <div className={s.subaction}>
                    <SuperCheckbox onChangeChecked={setRememberMe} />
                    <span>Remember Me</span>
                </div>
                <NavLink to={'/passwordrecovery'} className={s.forgot}>Forgot Password</NavLink>
            </div>
            <SuperButton onClick={onclickHandler} disabled={status === 'loading'}>Login</SuperButton>
            <div className={s.register}><NavLink to={'/register'} className={s.text}>Register</NavLink></div>
        </div>
    )
})