import React, {Component} from 'react'
import {Redirect, Route, Switch} from "react-router-dom"

import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStroopwafel} from '@fortawesome/free-solid-svg-icons'

// library.add(faStroopwafel)

import ContestDetailContainer from "./app/contest/components/ContestDetailContainer"
import ContestsPageContainer from "./app/contests/components/ContestsPageContainer"
import NewContestContainer from "./app/newcontest/components/NewContestContainer"


class App extends Component {
    render() {
        return (
            <div id="app" className="App">
                <Switch>
                    <Route exact path='/contests/new' component={NewContestContainer}/>
                    <Route exact path='/contests' component={ContestsPageContainer}/>
                    <Route path='/contests/:id' component={ContestDetailContainer}/>
                    <Redirect to='/contests'/>
                </Switch>
            </div>
        )
    }
}

export default App
