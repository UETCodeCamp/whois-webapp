import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Router} from "react-router-dom"
import getHistory from "./store/getHistory"
import "./styles/main.scss"

ReactDOM.render(
    (
        <Router history={getHistory()}>
            <App/>
        </Router>
    ),
    document.getElementById('root')
)

