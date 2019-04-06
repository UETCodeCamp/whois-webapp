import React, {Component} from 'react'
import {getListIssues} from "../../../services/apis/ContestAPIServices"

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
                <h3>Submitted</h3>
                <div className="Issue">
                    {issues.map((issue, index) => {
                        const {_id, github_id, camper, title, status, message} = issue
                        const {username} = Object.assign({}, camper)

                        return (
                            <div className="Task" id={`issue-${github_id}`} key={_id}>
                                <span className="Order">#{index + 1}</span>
                                <span> </span>
                                <strong className="Name">{username}</strong>
                                <span> - </span>
                                <span className="Title">{title}</span>
                                <span> - </span>
                                <span className="text-info">{status}</span>

                                {
                                    !!message &&
                                    <span className="Message text-danger">{message}</span>
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ContestIssues
