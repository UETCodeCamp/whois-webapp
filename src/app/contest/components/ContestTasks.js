import React, {Component} from 'react'
import {getListTasks} from "../../../services/apis/ContestAPIServices"

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
                <h3>Top</h3>
                <div className="Tasks">
                    {tasks.map((task, index) => {
                        const {_id, camper, is_pass} = task
                        const {username,} = Object.assign({}, camper)

                        return (
                            <div className="Task" key={_id}>
                                <span className="Order">#{index + 1}</span>
                                <span> </span>
                                <strong className="Name">{username}</strong>
                                <span> - </span>
                                <span>{is_pass ? 'Passed' : 'Failed'}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default ContestTasks
