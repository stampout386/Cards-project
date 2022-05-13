import React from "react";
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import SuperCheckbox from "../common/SuperCheckbox/SuperCheckbox";
import s from './Test.module.css'
import {SuperDoubleRange} from "../common/SuperDoubleRange/SuperDoubleRange";

export function Test() {
    return (
        <div className={s.container}>
            <SuperInputText className={s.container}/>
            <SuperButton className={s.container}>Button</SuperButton>
            <SuperCheckbox className={s.container}/>
            <SuperDoubleRange min={0} max={100} step={5}/>
        </div>
    );
}