import React, {Component} from 'react'
import JobsPage from "./JobsPage"

class JobsPageContainer extends Component {
    render() {
        return (
            <div className="JobsPageContainer">
                <JobsPage  {...this.props}/>
            </div>
        )
    }
}

export default JobsPageContainer
