import React, {useEffect} from 'react';
import './App.css';
import {MyRoutes} from "./components/MyRoutes";
import {MyMenu} from "./components/MyMenu/MyMenu";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {initializeAppTC} from "./redux/appReducer";


function App() {
    const isInitialized = useSelector<AppRootStateType>(state => state.app.isInitialized)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])


    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>...Loading</div>
    }


    return (
        <div>
            <MyMenu/>
            <MyRoutes/>
        </div>
    );
}

export default App;
