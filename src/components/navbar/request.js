import React from 'react'
import PropTypes from 'prop-types'

const Request = ({ date, sender, senderId, team, teamId, onAcceptClick, onDeclineClick }) => {
    const DATE = new Date( date ).toLocaleDateString()
    return (
        <li>
            <div>
                <div className = 'request-wrap'>
                    <div className = 'request-title'>
                        <span>{ team }</span>
                        <span className = 'date-w'>{ `Date: ${ DATE }` }</span>
                    </div>
                    <div className = 'request-content'>
                        <span>
                            <span className = 'requester text-capitalize'>
                                { sender }
                            </span>
                            &nbsp;
                            <span>has invited you to join his team</span>
                        </span>
                    </div>
                    <div className = 'request-controllers'>
                        <button
                            onClick = { () => onAcceptClick( senderId, teamId )}>
                            Accept
                        </button>
                        <button
                            onClick = { () => onDeclineClick( teamId )}>
                            Decline
                        </button>
                    </div>
                </div>
            </div>
        </li>
    )
}

Request.propTypes = {
    date: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    senderId: PropTypes.string.isRequired,
    team: PropTypes.string.isRequired,
    teamId: PropTypes.string.isRequired,
    onAcceptClick: PropTypes.func.isRequired,
    onDeclineClick: PropTypes.func.isRequired
}
export default Request
