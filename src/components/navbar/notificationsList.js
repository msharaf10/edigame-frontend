import React from 'react'
import PropTypes from 'prop-types'
import Notification from './notification'

const NotificationsList = ({
    notifications,
    onDeleteClick
}) => {
    const totalUnSeen = notifications.filter( n => n.seen === false ).length
    return (
        <div className = 'p-2 notifications-toggler'>
            <span className = 'toggle-n-list'>
                {
                    totalUnSeen === 0 ? null :
                    <span className = 'badge badge-pill badge-primary'>
                        { totalUnSeen }
                    </span>
                }
                <i className = 'fa fa-globe' title = 'Notifications'></i>
                <div className = 'notifications-holder'>
                    {
                        !notifications.length ?
                        <p style = {{ textAlign: 'center', margin: '0' }}>
                            You have no notifications
                        </p> :
                        <ul className = 'notification-list'>
                            {
                                notifications.map( n =>
                                    <Notification
                                        onDeleteClick = { onDeleteClick }
                                        key = { n._id }
                                        { ...n }
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

NotificationsList.propTypes = {
    onDeleteClick: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

export default NotificationsList
