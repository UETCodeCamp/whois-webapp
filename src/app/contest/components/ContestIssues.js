import React, {Component} from 'react'
import {getListIssues} from "../../../services/apis/ContestAPIServices"

class ContestIssues extends Component {
    state = {
        issues: []
    }

    componentDidMount() {
        this._fetch()
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
                        const {_id, camper, title, status} = issue
                        const {username,} = Object.assign({}, camper)

                        return (
                            <div className="Task" key={_id}>
                                <span className="Order">#{index + 1}</span>
                                <span> </span>
                                <span className="Name">{username}</span>
                                <span> - </span>
                                <span className="Title">{title}</span>
                                <span> - </span>
                                <span>{status}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ContestIssues
