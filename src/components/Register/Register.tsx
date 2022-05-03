import React, {useState} from "react";
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import './Register.css'
import {cardsAPI} from "../../api/cardsAPI";

export function Register() {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [error, setError] = useState(false)

    const payload = {
        email: email,
        password: pass
    }
    const onClickHandler = () => {
        if (pass === pass2) {
            cardsAPI.signUp(payload)
                .then(r => {
                    console.log(r)
                })
        } else {
            setError(true)
        }
    };
    return (
        <div className={'register'}>
            Register
            <div>
                <SuperInputText placeholder={'email'}
                                onChangeText={setEmail}
                                value={email}/>
            </div>
            <div>
                <SuperInputText placeholder={'password'}
                                onChangeText={setPass}
                                value={pass}/>
            </div>
            <div>
                <SuperInputText placeholder={'repeat password'}
                                onChangeText={setPass2}
                                value={pass2}/>
            </div>
            {error && <div className={"error"}>ERROR:password must be the same </div>}
            <div>
                <SuperButton>cansel</SuperButton>
                <SuperButton onClick={onClickHandler}>register</SuperButton>
            </div>
        </div>
    )
}