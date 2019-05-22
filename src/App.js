import React from 'react';
import './App.css';
import Posts from "./components/Posts";
import Postform from "./components/Postform";
import Provider from "react-redux/es/components/Provider";
import store from './store.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
        <Provider store={store}>
            <div className="App">

                <Postform/>

                <hr/>

                <Posts/>

            </div>
        </Provider>
    );
}

export default App;
