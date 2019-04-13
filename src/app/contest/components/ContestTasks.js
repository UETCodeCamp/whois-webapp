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

    render() {
        const {tasks} = this.state

        return (
            <div className="ContestTasks">
                <h4>Top</h4>
                <div className="Tasks">
                    {tasks.map((task, index) => {
                        const {_id, camper, is_pass, updated} = task
                        const {username} = Object.assign({}, camper)
                        const className = is_pass ? 'text-success' : 'text-danger'
                        const time = moment(updated)
                        const timeAgo = time.fromNow()

                        return (
                            <div className="Task" key={_id}>
                                <span className="Order">#{index + 1}</span>
                                <span> </span>
                                <strong className="Name">{username}</strong>
                                <span> - </span>
                                <span className={className}>{is_pass ? 'Passed' : 'Failed'}</span>
                                <span> - </span>
                                <span>{timeAgo}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ContestTasks
