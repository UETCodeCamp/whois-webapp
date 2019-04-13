import React, {Component} from 'react'
import {getListContests} from "../../../services/apis/ContestAPIServices"
import {Link} from "react-router-dom"
import moment from 'moment'
import './ContestsPage.scss'
import getHistory from "../../../store/getHistory"

class ContestsPage extends Component {
    state = {
        contests: []
    }

    componentDidMount() {
        this._fetch()
    }

    _fetch = async () => {
        const {data, success} = await getListContests()

        if (success) {
            const {contests} = data

            this.setState({
                contests
            })
        }
    }

    _goToCreateNewContest = () => {
        const history = getHistory()
        history.push('/contests/new')
    }

    _goToContestDetail = (id) => () => {
        const history = getHistory()
        history.push(`/contests/${id}`)
    }

    render() {
        const {contests} = this.state

        return (
            <div className="ContestsPage">
                <div className="container col-md-6 col-sm-10">
                    <h2>Contest List</h2>
                    <div className="my-card" onClick={this._goToCreateNewContest}>
                        Create new Contest ... <i className="fas fa-chevron-right"/>
                    </div>
                    {/*<button className="btn btn-primary btn-block"*/}
                    {/*onClick={this._goToCreateNewContest}>*/}
                    {/*Create new Contest ... <i className="fas fa-chevron-right"/>*/}
                    {/*</button>*/}
                    {
                        contests.map(contest => {
                            const {_id, owner, repo, deadline, status} = contest
                            const isActive = status === 'active';

                            return (
                                <div className="Contest" key={_id}>
                                    <div className="my-card" onClick={this._goToContestDetail(_id)}>
                                        <div className="name">{owner}/{repo}</div>
                                        <div className="deadline">
                                            Dead line: <span className={isActive ? "time-in" : "time-out"}>
                                            {moment(deadline).format('DD/MM/YYYY')}
                                            </span>
                                        </div>
                                        <i className="fas fa-hourglass-half"/>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ContestsPage
