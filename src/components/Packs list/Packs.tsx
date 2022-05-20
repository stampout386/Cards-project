import React, {ChangeEvent, useEffect, useState, KeyboardEvent} from 'react';
import {Button, Input, Layout, Modal, Popconfirm, Space, Spin, Table} from "antd";
import 'antd/dist/antd.css';
import {useDispatch, useSelector} from "react-redux";
import {Content} from "antd/es/layout/layout";
import {NavLink, Navigate} from 'react-router-dom';
import {ColumnsType} from "antd/es/table";
import {message} from "antd/es";
import {AppRootStateType} from "../../redux/store";
import {CardPacksType} from "../../api/cardsAPI";
import {
    addPackTC,
    currentPackIdAC,
    deletePackTC,
    getPacksTC,
    setFilteredPacksAC,
    updatePackTC
} from "../../redux/packsReducer";
import SuperButton from "../common/SuperButton/SuperButton";
import s from './Packs.module.css'
import {SideBar} from "./SideBar";

interface User {
    name: string
    cardsCount: number
    creator: string
    lastUpdate: string
    key: string
}

export const Packs = () => {

    const [packName, setPackName] = useState("")
    const [firstLoading, setFirstLoading] = useState<boolean>(true)
    const [updatePackName, setUpdatePackName] = useState("")
    const [value, setValue] = useState("")

    const [isModalVisible, setIsModalVisible] = useState(false)
    const [updateModalVisible, setUpdateModalVisible] = useState(false)

    const state = useSelector<AppRootStateType, Array<CardPacksType>>(s => s.packs.cardPacks)
    const currentId = useSelector<AppRootStateType, string>(s => s.packs.cardsPack_id)
    const isLoading = useSelector<AppRootStateType, boolean>(s => s.packs.isLoading)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(s => s.loginPage.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (firstLoading) {
            dispatch<any>(getPacksTC())
            setFirstLoading(false)
        }
    }, [dispatch, firstLoading])

    //update pack name
    const onOk = () => {
        if (updatePackName.trim()) {
            setUpdateModalVisible(false)
            dispatch<any>(updatePackTC({_id: currentId, name: updatePackName.trim()}))
            setUpdatePackName('')
        }}

    //close
    const onCancel = () => {
        setUpdateModalVisible(false)
        setUpdatePackName('')
    }

    //input in modal
    const handleUpdate = (event: ChangeEvent<HTMLInputElement>) => setUpdatePackName(event.currentTarget.value)
    //open
    const modalCallBack = () => setUpdateModalVisible(true)

    const handleSetName = (event: ChangeEvent<HTMLInputElement>) => setPackName(event.currentTarget.value)

    const showModal = () => setIsModalVisible(true)

    const handleOk = () => {
        if (packName.trim()) {
            setIsModalVisible(false)
            dispatch<any>(addPackTC({name: packName.trim()}))
            setPackName('')
        }}

    const handleCancel = () => {
        setIsModalVisible(false)
        setPackName('')
    }

    // get id
    const getId = (id: string) => dispatch(currentPackIdAC(id))

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

    useEffect(() => {
        if (packName !== value) setValue(packName)
    }, [packName])

    const onKeyPressBtnHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            dispatch(setFilteredPacksAC(value))
        }
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    const columns: ColumnsType<User> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Cards',
            dataIndex: 'cardsCount',
            key: 'cardsCount',
            sorter: {
                compare: (a, b) => a.cardsCount - b.cardsCount,
                multiple: 1
            },
        },
        {
            title: 'Last Updated',
            dataIndex: 'lastUpdate',
            key: 'lastUpdate',
        },
        {
            title: 'Created by',
            dataIndex: 'creator',
            key: 'creator',
            render: (creator: React.ReactNode) => (
                <Space size="middle">
                    <div>{creator}</div>
                </Space>
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            render: (s, record: { key: React.Key }) => (
                <div>
                    <Space size={'middle'}>
                        <Popconfirm title="Are you sure?" onConfirm={() => handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                        <NavLink to={'/cards'}>Learn</NavLink>
                        <a onClick={() => modalCallBack()}>Update</a>
                    </Space>
                </div>
            ),
        },
    ];

    const handleDelete = (key: React.Key) => {
        const packId = key.toString()
        dispatch<any>(deletePackTC(packId))
        dispatch(currentPackIdAC(packId))
    }


    const data: User[] = state.map((pack) => ({
        name: pack.name,
        cardsCount: pack.cardsCount,
        lastUpdate: pack.updated.substring(0, 10).replace(/-/g, " "),
        creator: pack.user_name,
        key: pack._id
    }))

    return (
        <div className={s.main}>
            <div className={s.left}>
                <SideBar/>
            </div>
            <div className={s.right}>
                <div className={s.top}>
                <h3>Packs List</h3>
                <input value={value} type="text" placeholder={'Search...'} onChange={handleChange} onKeyPress={onKeyPressBtnHandler}/>
                <SuperButton onClick={showModal}>Add new pack</SuperButton>
                </div>
                <Spin spinning={isLoading}>
                    <Modal title="Add Pack" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                        <span>Pack name: </span>
                        <Input onChange={handleSetName} value={packName}/>
                    </Modal>
                    <Modal title="Update pack name" visible={updateModalVisible} onOk={onOk} onCancel={onCancel}>
                        <span>Update pack name: </span>
                        <Input onChange={handleUpdate} value={updatePackName}/>
                    </Modal>
                    <Content>
                        <Table dataSource={data}
                               columns={columns}
                               onRow={(record) => {
                                   return {
                                       onClick: () => getId(record.key),
                                   }
                               }}
                               pagination={{
                                   position: ['bottomRight'],
                                   defaultPageSize: 8,
                                   pageSizeOptions: ['4', '8', '12']
                               }}
                        />
                    </Content>

                </Spin>
            </div>

        </div>
    )
}