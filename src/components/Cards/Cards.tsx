import React, {useEffect, useState} from "react";
import {cardsAPI, instance} from "../../api/cardsAPI";
import { Table } from 'antd';
import 'antd/dist/antd.css'
import {useDispatch, useSelector} from "react-redux";
import {getCardsTC} from "../../redux/cardsReducer";
import {AppRootStateType} from "../../redux/store";

export const Cards = () => {

    // const dispatch:any = useDispatch()

    // useEffect(() => {
    //     dispatch(getCardsTC(cardsPackId))
    // }, [])
    const onDeleteHandler = (key: any) => {
        console.log(key)
    }
    const data1 = [{key: '1', question: '', answer: '', grade: 0,},];
    const [data, setRows] = useState(data1)
   // let data = useSelector<AppRootStateType>(state => state.cardsPage)

    console.log(data)
    const columns:any = [
        {
            title: 'Question',
            dataIndex: 'question',
            sorter: (a: any, b: any) => a.question.length - b.question.length,
        },{
            title: 'Answer',
            dataIndex: 'answer',
            sorter: (a:any, b:any) => a.age - b.age,
        },

        {
            title: 'Grade',
            dataIndex: 'grade',
            sorter: (a:any, b:any) => a.grade - b.grade,
        },
        {
            title: 'Updated',
            dataIndex: 'updated',
            sorter: (a: any, b: any) => a.updated - b.updated,
        },
        {
            title: 'Actions',
            dataIndex: 'operation',
            render: (key:any)=><a onClick={()=>onDeleteHandler(key)}>Delete</a>
        },
    ];




    function onChange(pagination:any, filters:any, sorter:any, extra:any) {
        console.log('params', pagination, filters, sorter, extra);
    }
    // const onClickCardsHandler = () => {
    //   cardsAPI.getCards()
    // }
    // const onClickPacksHandler = () => {
    //   cardsAPI.getPacks()
    // }
    const cardsPackId = '60ae372b469a3a0004c7b7a0'

    useEffect(() => {
        instance.get(`/cards/card?cardsPack_id=${cardsPackId}&pageCount=200`)
            .then(r => {
                console.log(r.data.cards)
                r.data.cards && setRows(r.data.cards
                    //    .map((m:{}, i:string)=> ({...m, id: i}))
                )
            })
    }, [])


  // @ts-ignore
    return<>
      {/*<div>*/}

      {/*    <button onClick={onClickCardsHandler}>getCards</button>*/}
      {/*    <button onClick={onClickPacksHandler}>getPacks</button>*/}

      {/*</div>*/}
      <Table columns={columns}
             dataSource={data}
             onChange={onChange}
             pagination={{ pageSize: 3 }}/>;
  </>
}