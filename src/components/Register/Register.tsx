import React, {useState} from "react";
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import './Register.css'
import {cardsAPI} from "../../api/cardsAPI";
import {useNavigate} from "react-router-dom";

export function Register() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const payload = {
        email: email,
        password: pass
    }
    const onClickRegisterHandler = () => {
        if (pass === pass2) {
            cardsAPI.signUp(payload)
                .then(() => {
                    navigate('/login')
                })
                .catch(r=>{
                    setError(r.response.data.error)
                })
        } else {
            setError('ERROR:password must be the same')
        }
    };
    const onClickCancelHandler = () => {
        if(error){
            setError('')
        }else{
            navigate('/login')
        }
    };
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