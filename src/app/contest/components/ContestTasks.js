import React, {Component} from 'react'
import {getListTasks} from "../../../services/apis/ContestAPIServices"
import moment from 'moment'

class ContestTasks extends Component {
    state = {
        tasks: []
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
        const {data, success} = await getListTasks(this.props.id)

        if (success) {
            const {tasks} = data

            this.setState({
                tasks
            })
        }
    }

    _renderList = (tasks) => {
        return tasks.map((task, index) => {
            const {_id, camper, is_pass, updated} = task
            const {username, url} = Object.assign({}, camper)
            const className = is_pass ? 'text-success' : 'text-danger'
            const time = moment(updated)
            const timeAgo = time.fromNow()

            return (
                <tr key={`${_id}`}>
                    <td>{index + 1}</td>
                    <td><a href={url} target="_blank" rel="noopener noreferrer">{username}</a></td>
                    <td className={className}>
                        {is_pass ? 'Passed' : 'Failed'}
                    </td>
                    <td>
                        {timeAgo}
                    </td>
                </tr>
            )
        })
    }

    render() {
        const {tasks} = this.state
        const passedTasks = tasks.filter(task => task.is_pass)
        const failedTasks = tasks.filter(task => !task.is_pass)

        return (
            <div className="ContestTasks">
                <p><i>Top student submitted.</i></p>
                <div className="Tasks">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Username</th>
                            <th scope="col">Status</th>
                            <th scope="col">Last update</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this._renderList(passedTasks)}
                        {this._renderList(failedTasks)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ContestTasks
