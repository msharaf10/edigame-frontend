import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ _id, date, seen, read, sender, subject, onDeleteClick }) => {
    let DATE = new Date( date ).toLocaleDateString()
    return (
        <li className = { seen ? 'seen' : '' }>
            <div>
                <div className = 'notification-wrap'>
                    <span
                        className = 'delete-n'
                        title = 'Delete notification'
                        onClick = { () => onDeleteClick( _id ) }>
                        &times;
                    </span>
                    <div className = 'notification-title'>
                        <span>{ subject }</span>
                        <span className = 'date-w'>{ `Date: ${ DATE }` }</span>
                    </div>
                    <div className = 'notification-content'>
                        <span>{ `From: ${ sender }` }</span>
                    </div>
                </div>
            </div>
        </li>
    )
}

Notification.propTypes = {
    _id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    seen: PropTypes.bool.isRequired,
    read: PropTypes.bool.isRequired,
    sender: PropTypes.string.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}
export default Notification
