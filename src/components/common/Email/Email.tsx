import React, {memo} from 'react';
import s from "./Email.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons';

export const Email = memo(() => {
    return (
        <div className={s.main}>
            <FontAwesomeIcon className={s.icon} icon={faEnvelopeOpenText}/>
            <h3>Check Email</h3>
            <p>We've sent an Email with instructions <br/> to your email</p>
        </div>
    )
})