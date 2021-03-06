import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logoutUser, deleteNotification, acceptTeamRequest, declineTeamRequest } from '../actions/index'

import Loading from '../components/loading'
import UserInfo from '../components/navbar/userInfo'
import RequestsList from '../components/navbar/requestsList'
import NavigationList from '../components/navbar/navigationList'
import NotificationsList from '../components/navbar/notificationsList'

const Navbar = ({ dispatch, payload, requests, notifications }) => {
    if ( !payload._id )
        return (
            <div className = 'd-flex align-items-center navbar-holder'>
                <Loading />
            </div>
        )
    return (
        <div className = 'd-flex align-items-center navbar-holder'>
            <UserInfo { ...payload } />
            {
                payload.role !== 'Client' ? null :
                <RequestsList
                    onAcceptClick = { ( adminId, teamId ) => dispatch( acceptTeamRequest( adminId, teamId ) ) }
                    onDeclineClick = { teamId => dispatch( declineTeamRequest( payload._id, teamId ) ) }
                    requests = { requests } />
            }
            {
                payload.role === 'SuperAdmin' ? null :
                <NotificationsList
                    notifications = { notifications }
                    onDeleteClick = { id => dispatch( deleteNotification( id ) ) }
                />
            }
            <NavigationList
                user = { payload }
                onLogoutClick = { e => {
                    e.preventDefault()
                    dispatch( logoutUser() )
                }}
            />
        </div>
    )
}

Navbar.propTypes = {
    payload: PropTypes.object.isRequired,
    requests: PropTypes.array.isRequired,
    notifications: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => {
    const { user } = state
    const { payload, requests, notifications } = user
    return {
        payload,
        requests,
        notifications
    }
}

export default connect( mapStateToProps )( Navbar )
