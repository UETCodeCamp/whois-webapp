import React, {Component} from 'react'
import {getListJobs} from "../../../services/apis/JobAPIServices"

class JobsPage extends Component {
    state = {
        jobs: [],
        loading: false,
        error: ''
    }

    componentDidMount() {
        this._fetchAllJobs()
    }

    _fetchAllJobs = async () => {
        const {success, data, message} = await getListJobs()

        if (!success) {
            return this.setState({
                loading: false,
                error: message
            })
        }

        const {jobs} = data

        this.setState({
            jobs,
            loading: false,
            error: ''
        })
    }

    render() {
        const {jobs} = this.state

        return (
            <div className="JobsPage">
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Student repository</th>
                            <th>Tester repository</th>
                            <th>Status</th>
                            <th>Updated</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            jobs.map((job, index) => {
                                const {_id, student_repo, tester_repo, status, updated} = job

                                return (
                                    <tr key={_id} id={`Job-${_id}`}>
                                        <td>{index + 1}</td>
                                        <td>{student_repo}</td>
                                        <td>{tester_repo}</td>
                                        <td>{status}</td>
                                        <td>{updated}</td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default JobsPage
