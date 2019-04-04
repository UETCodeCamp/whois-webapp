import React, {Component} from 'react'
import {getListContests} from "../../../services/apis/ContestAPIServices"
import {Link} from "react-router-dom"

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

    render() {
        const {contests} = this.state

        return (
            <div className="ContestsPage">
                {
                    contests.map(contest => {
                        const {_id, owner, repo} = contest

                        return (
                            <div className="Contest" key={_id}>
                                <Link to={`/contests/${_id}`}>{owner}/{repo}</Link>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ContestsPage
