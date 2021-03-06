import React, {Component} from 'react'
import {createNewContest} from '../../../services/apis/ContestAPIServices'
import getHistory from "../../../store/getHistory"
import {Link} from "react-router-dom"

class NewContest extends Component {
    state = {
        isValidData: false,
        form: {
            url: '',
            runner: '',
            deadline: '',
        }
    }

    _handleChange = (event) => {
        const target = event.target
        const name = target.name
        let form = {
            ...this.state.form,
            [name]: event.target.value
        }
        this.setState({
            form
        })
    }

    _onSubmit = async () => {
        if (!this._isValidData()) {
            alert('Invalid input!')
            return
        }

        let password = prompt('Please enter your password', '')
        if (!password) {
            alert('Please enter your password')
            return
        }

        let body = {...this.state.form}
        const {success, message} = await createNewContest(body, password)

        if (success) {
            console.log('success')
            const history = getHistory()
            history.push('/contests')
        } else {
            alert(message)
        }
    }

    _isValidData = () => {
        const {url, deadline, runner} = this.state.form

        if (!url) return false
        if (!deadline) return false
        if (!runner) return false

        return true
    }

    render() {
        return (
            <div className="NewContest">
                <div className="container col-md-6 col-sm-10">
                    <h2>New Contest</h2>

                    <div>
                        <div className="form-group">
                            <input type="url" className="form-control"
                                   placeholder="Github repository url"
                                   name="url"
                                   value={this.state.form.url}
                                   onChange={this._handleChange}/>
                        </div>
                        <div className="form-group">
                            <input type="text" className="form-control"
                                   placeholder="Runner name. For example: node-http"
                                   name="runner"
                                   value={this.state.form.runner}
                                   onChange={this._handleChange}/>
                        </div>

                        <div className="form-group">
                            <input type="text" className="form-control"
                                   placeholder="Deadline (dd/MM/yyyy)"
                                   name="deadline"
                                   value={this.state.form.deadline}
                                   onChange={this._handleChange}/>
                        </div>

                        <button className="btn btn-primary btn-block"
                                onClick={this._onSubmit}>
                            Submit
                        </button>

                        <div className="btn-back text-center mt-3">
                            <Link to={`/contests`}>Back to Contest List</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default NewContest
