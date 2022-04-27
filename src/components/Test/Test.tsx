import React from "react";
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import s from './Test.module.css'

export function Test() {
    return (
        <div className={s.container}>
            <SuperInputText className={s.container}/>
            <SuperButton className={s.container}>Button</SuperButton>
            <SuperCheckbox className={s.container}/>
        </div>
    );
}