import React, {useEffect, useState} from 'react';
import {instance} from "../../api/cardsAPI";
import s from './CardsPage.module.css'


export const CardsPage = () => {

    let rows1 = [
        {id: 1, answer: '', question: ''},
    ];

    const packId = '60ae372b469a3a0004c7b7a0'
    const [rows, setRows] = useState(rows1)
    useEffect(() => {
        instance.get(`/cards/card?cardsPack_id=${packId}`)
            .then(r => {
                console.log(r.data.cards)
                r.data.cards && setRows(r.data.cards
                    //    .map((m:{}, i:string)=> ({...m, id: i}))
                )
            })
    }, [])

    return (
        <div>
            <hr/>
            <div className={s.tabl}>
                <p>Question</p>
                <p> </p>
                <p>Answer</p>
            </div>
            <hr/>
            {rows.map(m =>
                <>
                    <div className={s.tabl}>
                        <p>{m.question} : </p>
                        <p> </p>
                        <p>{m.answer}</p>
                    </div>
                    <hr/>
                </>
            )}
        </div>
    );
}
