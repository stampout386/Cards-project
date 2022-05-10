import React, {memo} from 'react';
import s from "./Email.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

export const Email = memo(() => {
    return (
        <div className={s.main}>
            <div className={s.wrapper}><FontAwesomeIcon className={s.icon} icon={faEnvelopeOpenText}/></div>
            <h3>Check Email</h3>
            <div className={s.text}><p>We've sent an Email with instructions to<br/> your email</p></div>
        </div>
    )
})