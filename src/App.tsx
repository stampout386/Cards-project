import React, {useEffect} from 'react';
import './App.css';
import {MyRoutes} from "./components/MyRoutes";
import {MyMenu} from "./components/MyMenu/MyMenu";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {initializeAppTC} from "./redux/appReducer";
import {Preloader} from "./components/common/Preloader/Preloader";


function App() {
    const isInitialized = useSelector<AppRootStateType>(state => state.app.isInitialized)
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])


    if (!isInitialized) {
        // return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}><Preloader/></div>
        return <div style={{position: 'fixed', top: '40%', left:'40%'}}><Preloader/></div>
    }


    return (
        <div className={"App"}>
            <MyMenu/>
            <MyRoutes/>
        </div>
    );
}

export default App;
