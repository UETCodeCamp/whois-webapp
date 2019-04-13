import React, {Component} from 'react'
import {getListIssues} from "../../../services/apis/ContestAPIServices"
import ReactTooltip from 'react-tooltip'

class ContestIssues extends Component {
    state = {
        issues: []
    }

    _interval = null

    componentDidMount() {
        this._fetch()
        this._refresh()
    }

    componentWillMount() {
        this._interval && clearInterval(this._interval)
    }

    _refresh = () => {
        this._interval = setInterval(() => {
            this._fetch()
        }, 5000)
    }

    _fetch = async () => {
        const {data, success} = await getListIssues(this.props.id)

        if (success) {
            const {issues} = data

            this.setState({
                issues
            })
        }
    }

    render() {
        const {issues} = this.state

        return (
            <div className="ContestIssues">
                <h4>Submitted</h4>
                <div className="Issue">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">FullName</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {issues.map((issue, index) => {
                            const {_id, github_id, camper, title, status, message} = issue
                            const {username} = Object.assign({}, camper)

                            return (
                                <tr>
                                    <td scope="row">{index + 1}</td>
                                    <td>{username}</td>
                                    <td>{title}</td>
                                    <td>
                                        <div data-for='enrich' data-tip={message}
                                             className={message ? 'text-danger' : 'text-info'}>{status}
                                        </div>
                                        <ReactTooltip id='enrich' getContent={(dataTip) => dataTip}/>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ContestIssues
