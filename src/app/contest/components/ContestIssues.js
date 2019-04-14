import React, {Component} from 'react'
import {getListIssues} from "../../../services/apis/ContestAPIServices"
import ReactTooltip from 'react-tooltip'
import moment from "moment"

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
                            <th scope="col">Source</th>
                            <th scope="col">Status</th>
                            <th scope="col">Created date</th>
                        </tr>
                        </thead>
                        <tbody>
                        {issues.map((issue, index) => {
                            const {_id, github_id, camper, title, status, message, created, source} = issue
                            const {username} = Object.assign({}, camper)
                            const sourceEl = !source ? title :
                                <a href={source} target="_blank" rel="noopener noreferrer">
                                    {title}
                                </a>
                            const classForStatus = status === 'pending' ?
                                'text-black-50' :
                                status === 'processed' && message ?
                                    'text-danger' :
                                    'text-info'

                            return (
                                <tr key={`${_id}${github_id}`}>
                                    <td>{index + 1}</td>
                                    <td>{username}</td>
                                    <td>
                                        {sourceEl}
                                    </td>
                                    <td>
                                        <div data-for='enrich' data-tip={message}
                                             className={classForStatus}>{status}
                                        </div>
                                        <ReactTooltip id='enrich' getContent={(dataTip) => dataTip}/>
                                    </td>
                                    <td>{moment(created).format('DD/MM/YYYY hh:mm:ss')}</td>
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
