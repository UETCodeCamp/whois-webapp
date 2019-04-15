import React, {Component} from 'react'
import {getContestDetail} from "../../../services/apis/ContestAPIServices"
import ContestTasks from "./ContestTasks"
import ContestIssues from "./ContestIssues"
import {Link} from "react-router-dom"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";

class ContestDetail extends Component {
    state = {
        detail: {
            owner: '...',
            repo: '...'
        },
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
        const {owner, repo, url} = Object.assign({}, detail)

        return (
            <div className="ContestDetail">
                <div className="container">
                    <div className="DetailInner mb-4">
                        <div className="mb-2">
                            <i className="fas fa-angle-left"/> <Link to={`/contests`}>Back</Link>
                        </div>
                        <h3>
                            <a href={url} target="_blank" rel="noopener noreferrer">{owner}/{repo}</a>
                        </h3>
                    </div>

                    <Tabs className="DetailTab">
                        <TabList>
                            <Tab>Top</Tab>
                            <Tab>Submitted</Tab>
                        </TabList>

                        <TabPanel forceRender={true}>
                            <ContestTasks id={id}/>
                        </TabPanel>
                        <TabPanel forceRender={true}>
                            <ContestIssues id={id}/>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default ContestDetail
