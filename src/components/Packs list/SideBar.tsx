import React, {useEffect} from 'react';
import {Button} from "antd";
import {SuperDoubleRange} from "../common/SuperDoubleRange/SuperDoubleRange";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {setMaxAC, setMinAC} from "../../redux/packsReducer";
import s from "./SideBar.module.css"

export const SideBar = () => {

    const dispatch = useDispatch()

    const maxCardsCount = useSelector<AppRootStateType, number>(state => state.packs.maxCardsCount)
    const max = useSelector<AppRootStateType, number>(state => state.packs.max)
    const min = useSelector<AppRootStateType, number>(state => state.packs.min)

    useEffect(() => {
        dispatch(setMaxAC(maxCardsCount))
    }, [maxCardsCount])

    const onChange = (value: [number, number]) => {
        if (value[0] !== min) dispatch(setMinAC(value[0]))
        if (value[1] !== max) dispatch(setMaxAC(value[1]))
    }
    return (
        <>
            <div className={s.wrapper}>
                <span>Show packs cards</span>
                <div className={s.group}><Button type="primary">My</Button><Button>All</Button></div>
                <span>Numbers of cards</span>
                <SuperDoubleRange min={min}
                                  max={max}
                                  //value={value}
                                  step={2}
                                  //onChange={onChange}
                />
            </div>
        </>
    )
}