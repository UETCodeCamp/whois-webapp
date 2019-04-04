import React, {Component} from 'react'
import ContestDetail from "./ContestDetail"

class ContestDetailContainer extends Component {
    _getId = () => {
        const {match} = this.props
        const {id} = match.params

        return id
    }

    render() {
        const id = this._getId()

        return (
            <div className="ContestDetailContainer">
                <ContestDetail id={id}/>
            </div>
        )
    }
}

export default ContestDetailContainer
