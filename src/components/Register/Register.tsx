import React from "react";
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import './Register.css'

export function Register() {
    return (
        <div className={'register'}>
            Register
            <div>
                <SuperInputText placeholder={'email'}/>
            </div>
            <div>
                <SuperInputText placeholder={'password'}/>
            </div>
            <div>
                <SuperInputText placeholder={'repeat password'}/>
            </div>
            <div>
                <SuperButton>cansel</SuperButton>
                <SuperButton>register</SuperButton>
            </div>
        </div>
    )
}