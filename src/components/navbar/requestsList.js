import React from 'react'
import PropTypes from 'prop-types'
import Request from './request'

const RequestsList = ({
    requests,
    onAcceptClick,
    onDeclineClick
}) => {
    let total = requests.length
    return (
        <div className = 'p-2 requests-toggler'>
            <span className = 'toggle-r-list'>
                {
                    total !== 0 ? <span className = 'new-r'>{ total }</span> : null
                }
                <i className = 'fa fa-bell' title = 'Requests'></i>
                <div className = 'requests-holder'>
                    {
                        !requests.length ?
                        <p style = {{ textAlign: 'center', margin: '0' }}>
                            You have no requests
                        </p> :
                        <ul className = 'request-list'>
                            {
                                requests.map( r =>
                                    <Request
                                        onAcceptClick = { onAcceptClick }
                                        onDeclineClick = { onDeclineClick }
                                        key = { r.teamId }
                                        { ...r }
                                    />
                                )
                            }
                        </ul>
                    }
                </div>
            </span>
        </div>
    )
}

RequestsList.propTypes = {
    requests: PropTypes.array.isRequired,
    onAcceptClick: PropTypes.func.isRequired,
    onDeclineClick: PropTypes.func.isRequired
}
export default RequestsList
