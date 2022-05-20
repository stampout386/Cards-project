import React, {ChangeEvent, useEffect, useState} from "react";
import {CardType} from "../../api/cardsAPI";
import {Table} from 'antd';
import 'antd/dist/antd.css'
import {useDispatch, useSelector} from "react-redux";
import {addCardsTC, addCardType, deleteCardTC, getCardsTC} from "../../redux/cardsReducer";
import {AppRootStateType} from "../../redux/store";
import SuperInputText from "../common/SuperInput/SuperInputText";
import SuperButton from "../common/SuperButton/SuperButton";
import {RequestStatusType} from "../../redux/appReducer";
import Spin from "antd/es/spin";

export const Cards = () => {

    const dispatch: any = useDispatch()

    const currentPack_id = useSelector<AppRootStateType, string>(s => s.packs.cardsPack_id)
    const newData = useSelector<AppRootStateType, CardType[]>(s => s.cards)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const [data, setRows] = useState([{}])
    const [newQuestion, setNewQuestion] = useState('')
    const [newAnswer, setNewAnswer] = useState('')

    const columns: any = [
        {
            title: 'Question',
            dataIndex: 'question',
            sorter: (a: any, b: any) => a.question.length - b.question.length,
        }, {
            title: 'Answer',
            dataIndex: 'answer',
            sorter: (a: any, b: any) => a.age - b.age,
        },

        {
            title: 'Grade',
            dataIndex: 'grade',
            sorter: (a: any, b: any) => a.grade - b.grade,
        },
        {
            title: 'Updated',
            dataIndex: 'updated',
            sorter: (a: any, b: any) => a.updated - b.updated,
        },
        {
            title: 'Actions',
            dataIndex: 'operation',
            render: (_: any, record: CardType) => <a onClick={() => onDeleteHandler(record)}>Delete</a>
        },
    ];
    const newCard: addCardType = {
        cardsPack_id: currentPack_id,
        question: newQuestion,
        answer: newAnswer,
    }

    useEffect(() => {
        dispatch(getCardsTC(currentPack_id))
    }, [dispatch, currentPack_id])
    useEffect(() => {
        setRows(newData)
    }, [newData])

    const onDeleteHandler = (card: CardType) => {
        try {
            dispatch(deleteCardTC(card))
        } catch {
            Error('some error occurred !')
        }
    }
    const handleAddCard = () => {
        try {
            dispatch(addCardsTC(newCard))
        } catch {
            Error('some error occurred !')
        } finally {
            setNewAnswer('')
            setNewQuestion('')
        }
    }
    const changeAnswerHandler = (event: ChangeEvent<HTMLInputElement>) => setNewAnswer(event.currentTarget.value)
    const changeQuestionHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(event.currentTarget.value)
    }

    return <>
        <Spin spinning={status === 'loading'}>
            <div>
                <div>
                <SuperInputText placeholder={'inter the question'}
                                value={newQuestion}
                                onChange={changeQuestionHandler}/>
                <SuperButton onClick={handleAddCard}>Add card</SuperButton>
                </div>
                    <SuperInputText placeholder={'inter the answer'}
                                value={newAnswer}
                                onChange={changeAnswerHandler}/>
            </div>
            <Table columns={columns}
                   dataSource={data}
                   pagination={{pageSize: 10}}/>;
        </Spin>
    </>
}