import React from 'react';

import './App.css';
import {MyRoutes} from "./components/MyRoutes";
import {MyMenu} from "./components/MyMenu/MyMenu";

function App() {
    return (
        <div>
            <MyMenu/>
            <MyRoutes/>
        </div>
    );
}

export default App;
