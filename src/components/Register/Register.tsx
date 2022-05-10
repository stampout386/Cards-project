import React, {useState} from "react";
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import './Register.css'
import {cardsAPI} from "../../api/cardsAPI";
import {Navigate, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {RequestStatusType, setStatusApp} from "../../redux/appReducer";
import {Preloader} from "../common/Preloader/Preloader";
import {Error} from "../../redux/loginReducer";

export type PayloadRegisterType = {
    email: string
    password: string
}

export function Register() {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginPage.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const error = useSelector<AppRootStateType, string>(state => state.loginPage.error)

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const payload: PayloadRegisterType = {
        email: email,
        password: pass
    }

    const onClickRegisterHandler = () => {
        if (pass === pass2) {
            dispatch(setStatusApp("loading"))
            cardsAPI.signUp(payload)
                .then(() => {
                    navigate('/login')
                })
                .catch(r => {
                    dispatch(Error(r.response.data.error))
                })
                .finally(() => {
                    dispatch(setStatusApp("succeeded"))
                })
        } else {
            dispatch(Error('ERROR:password must be the same'))
        }
    }

    const onClickCancelHandler = () => {
        if (error) {
            errorHandler()
        } else {
            navigate('/login')
        }
    }

    const errorHandler = () => {
        dispatch(Error(''))
    }

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={'register'}>
            {status === 'loading' &&
                <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}><Preloader/></div>}
            <h3>Register</h3>
            <div className={'place'}>
                <SuperInputText placeholder={'Email'}
                                onChangeText={setEmail}
                                value={email}
                                onClick={errorHandler}/>
            </div>
            <div className={'place'}>
                <SuperInputText placeholder={'Password'}
                                onChangeText={setPass}
                                value={pass}
                                onClick={errorHandler}/>
            </div>
            <div className={'place'}>
                <SuperInputText placeholder={'Repeat password'}
                                onChangeText={setPass2}
                                value={pass2}
                                onClick={errorHandler}/>
            </div>
            {error && <div className={"error"}>{error}</div>}
            <div className={'buttons'}>
                <SuperButton className={'button'}
                             onClick={onClickCancelHandler}
                             disabled={status === "loading"}>
                    Cancel
                </SuperButton>
                <SuperButton className={'button'}
                             onClick={onClickRegisterHandler}
                             disabled={status === 'loading'}>
                    Register
                </SuperButton>
            </div>
        </div>
    )
}