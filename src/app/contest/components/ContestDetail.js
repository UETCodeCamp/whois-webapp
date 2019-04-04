import React, {Component} from 'react'
import {getContestDetail} from "../../../services/apis/ContestAPIServices"
import ContestTasks from "./ContestTasks"
import ContestIssues from "./ContestIssues"

class ContestDetail extends Component {
    state = {
        detail: {},
    }

    componentDidMount() {
        this._fetchDetail()
    }

    _fetchDetail = async () => {
        const {id} = this.props
        const {data, success} = await getContestDetail(id)

        if (success) {
            this.setState({
                detail: data
            })
        }
    }

    render() {
        const {id} = this.props
        const {detail} = this.state
        const {owner, repo} = Object.assign({}, detail)

        return (
            <div className="ContestDetail">
                <div className="container">
                    <div className="DetailInner">
                        <h1>{owner}/{repo}</h1>
                    </div>

                    <ContestTasks id={id}/>
                    <ContestIssues id={id}/>
                </div>
            </div>
        )
    }
}

export default ContestDetail