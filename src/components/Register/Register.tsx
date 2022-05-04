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

export function Register() {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginPage.isLoggedIn)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const payload = {
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
                .catch(r=>{
                    setError(r.response.data.error)
                })
                .finally(()=>{
                    dispatch(setStatusApp("succeeded"))
                })
        } else {
            setError('ERROR:password must be the same')
        }
    }

    const onClickCancelHandler = () => {
        if(error){
            setError('')
        }else{
            navigate('/login')
        }
    }

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    if (status === 'loading') return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}><Preloader/></div>

    return (
        <div className={'register'}>
            <h3>Register</h3>
            <div className={'place'}>
                <SuperInputText placeholder={'email'}
                                onChangeText={setEmail}
                                value={email}/>
            </div>
            <div className={'place'}>
                <SuperInputText placeholder={'password'}
                                onChangeText={setPass}
                                value={pass}/>
            </div>
            <div className={'place'}>
                <SuperInputText placeholder={'repeat password'}
                                onChangeText={setPass2}
                                value={pass2}/>
            </div>
            {error && <div className={"error"}>{error}</div>}
            <div>
                <SuperButton className={'button'} onClick={onClickCancelHandler}>Cancel</SuperButton>
                <SuperButton className={'button'} onClick={onClickRegisterHandler}>Register</SuperButton>
            </div>
        </div>
    )
}