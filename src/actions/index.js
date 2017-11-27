import * as ActionTypes from './types'
import { removeToken, options } from '../helpers/auth'

/* Action creatores */
export const logoutUser = () => ({
    type: ActionTypes.LOGOUT_USER
})

export const filterTeam = value => ({
    type: ActionTypes.SET_FILTER_TEAM,
    value
})

export const filterUser = value => ({
    type: ActionTypes.SET_FILTER_USER,
    value
})

export const removeUserPageData = () => ({
    type: ActionTypes.REMOVE_USER_PAGE_DATA
})

export const removeFilter = () => ({
    type: ActionTypes.REMOVE_FILTER
})

const receiveUser = payload => ({
    type: ActionTypes.RECEIVE_USER,
    payload
})

const receiveUserData = data => ({
    type: ActionTypes.RECEVE_USER_DATA,
    data
})

const receiveNotifications = notifications => ({
    type: ActionTypes.RECEIVE_NOTIFICATIONS,
    notifications
})

const receiveRequests = requests => ({
    type: ActionTypes.RECEIVE_REQUESTS,
    requests
})

const receiveTeamOfUser = teams => ({
    type: ActionTypes.RECEIVE_TEAMS_OF_USER,
    teams
})

const receiveUserProfile = user => ({
    type: ActionTypes.RECEIVE_USER_PROFILE,
    user
})

const receiveTeamProfile = team => ({
    type: ActionTypes.RECEIVE_TEAM_PROFILE,
    team
})

const userProfileNotFound = msg => ({
    type: ActionTypes.USER_PROFILE_NOT_FOUND,
    msg
})

const teamProfileNotFound = msg => ({
    type: ActionTypes.TEAM_PROFILE_NOT_FOUND,
    msg
})

const teamProfileNotAllowed = msg => ({
    type: ActionTypes.TEAM_PROFILE_NOT_ALLOWED,
    msg
})

const teamsNotAllowed = msg => ({
    type: ActionTypes.TEAMS_NOT_ALLOWED,
    msg
})

const receiveUsers = users => ({
    type: ActionTypes.RECEIVE_USERS,
    users
})

const receiveTeams = teams => ({
    type: ActionTypes.RECEIVE_TEAMS,
    teams
})

const userPromoted = id => ({
    type: ActionTypes.USER_PROMOTED,
    id
})

const userDemoted = id => ({
    type: ActionTypes.USER_DEMOTED,
    id
})

const removeTeamRequest = teamId => ({
    type: ActionTypes.REMOVE_TEAM_REQUEST,
    teamId
})

const deleteOneNotification = id => ({
    type: ActionTypes.DELETE_ONE_NOTIFICATION,
    id
})

const deleteAllNotifications = () => ({
    type: ActionTypes.DELETE_ALL_NOTIFICATIONS
})

const requestSent = ( userId, teamId ) => ({
    type: ActionTypes.REQUEST_SENT,
    userId,
    teamId
})

const receiveSentTeamRequests = requests => ({
    type: ActionTypes.RECEIVE_SENT_TEAM_REQUESTS,
    requests
})

const removeMemberFromTeam = userId => ({
    type: ActionTypes.REMOVE_MEMBER_FROM_TEAM,
    userId
})

const chooseTeamLeader = userId => ({
    type: ActionTypes.CHOOSE_TEAM_LEADER,
    userId
})

/* Async actions */
export const fetchUserProfile = q => dispatch => {
    return fetch( `/api/users/${ q }` )
        .then( res => {

            if ( res.status === 200 )
                return res.json().then( user =>
                    dispatch( receiveUserProfile( user ) ) )

            res.json().then( msg => dispatch( userProfileNotFound( msg.error ) ) )
        })
}

export const fetchTeamProfile = q => dispatch => {
    return fetch( `/api/teams/${ q }`, options() )
        .then( res => {

            if ( res.status === 200 )
                return res.json().then( team =>
                    dispatch( receiveTeamProfile( team ) ) )
            debugger
            if ( res.status === 403 )
                return res.json().then( msg =>
                    dispatch( teamProfileNotAllowed( msg.error ) ) )

            res.json().then( msg => dispatch( teamProfileNotFound( msg.error ) ) )
        })
}

export const fetchUserData = id => dispatch => {
    return fetch( '/api/user/getData', options() )
        .then( res => {
            if ( res.status === 200 )
                return res.json().then( data => dispatch( receiveUserData( data ) ) )
            removeToken()
        })
}

export const fetchTeamsOfUser = id => dispatch => {
    return fetch( `/api/teams/users/${ id }`, options() )
        .then( res => res.json() )
        .then( teams => dispatch( receiveTeamOfUser( teams ) ) )
}

export const fetchUsers = () => dispatch => {
    return fetch( '/api/users' )
        .then( res => res.json() )
        .then( users => dispatch( receiveUsers( users ) ) )
        .catch( err => console.error( err ) )
}

export const fetchTeams = () => dispatch => {
    return fetch( '/api/teams', options() )
        .then( res => {
            if ( res.status === 403 )
                return res.json().then( msg => dispatch( teamsNotAllowed( msg.error ) ) )
            res.json().then( teams => dispatch( receiveTeams( teams ) ) )
        }).catch( err => console.error( err ) )
}

export const fetchSentTeamRequests = () => dispatch => {
    return fetch( '/api/requests/teams/sent', options() )
        .then( res => res.json() )
        .then( requests => dispatch( receiveSentTeamRequests( requests ) ) )
        .catch( err => console.error( err ) )
}

export const sendTeamRequest = ( userId, teamId ) => dispatch => {
    return fetch( '/api/requests/teams/send', options( 'POST', { userId, teamId } ) )
        .then( res => {
            if ( res.status !== 201 )
                return res.json().then( msg => alert( msg.error ) )
            alert( 'Request has been sent' )
            dispatch( requestSent( userId, teamId ) )
        }).catch( err => console.error( err ) )
}

export const acceptTeamRequest = ( adminId, teamId ) => dispatch => {
    return fetch( '/api/teams/members/add', options( 'POST', { adminId, teamId } ) )
        .then( res => {
            if ( res.status !== 201 )
                return res.json().then( msg => alert( msg.error ) )
            alert( 'You are now a member of this team' )
            dispatch( removeTeamRequest( teamId ) )
        })
}

export const declineTeamRequest = ( userId, teamId ) => dispatch => {
    return fetch( '/api/requests/teams/destroy', options( 'DELETE', { userId, teamId } ) )
        .then( res => {
            if ( res.status !== 200 )
                return res.json().then( msg => alert( msg.error ) )
            dispatch( removeTeamRequest( teamId ) )
        })
}

export const removeUserFromTeam = ( userId, teamId ) => dispatch => {
    return fetch( '/api/teams/members/destroy', options( 'DELETE', { userId, teamId } ) )
        .then( res => {
            if ( res.status !== 200 )
                return res.json().then( msg => alert( msg.error ) )
            dispatch( removeMemberFromTeam( userId ) )
        })
}

export const makeLeader = ( userId, teamId ) => dispatch => {
    return fetch( '/api/teams/members/leader', options( 'POST', { userId, teamId } ) )
        .then( res => {
            if ( res.status !== 200 )
                return res.json().then( msg => alert( msg.error ) )
            dispatch( chooseTeamLeader( userId ) )
        })
}

export const promoteUser = id => dispatch => {
    return fetch( '/api/admins', options( 'POST', { userId: id } ) )
        .then( res => {
            if ( res.status !== 201 )
                return res.json().then( err => alert( err.error ) )
            dispatch( userPromoted( id ) )
        })
}

export const demoteUser = id => dispatch => {
    return fetch( '/api/admins', options( 'DELETE', { userId: id } ) )
        .then( res => {
            if ( res.status !== 200 )
                return res.json().then( err => alert( err.error ) )
            dispatch( userDemoted( id ) )
        })
}

export const deleteNotification = id => dispatch => {
    return fetch( `/api/notifications/${ id }`, options( 'DELETE' ) )
        .then( res => {
            if ( res.status !== 200 )
                return res.json().then( err => alert( err.error ) )
            dispatch( deleteOneNotification( id ) )
        })
}

export const deleteNotifications = () => dispatch => {
    return fetch( '/api/notifications', options( 'DELETE' ) )
        .then( res => {
            alert( 'Success' )
            dispatch( deleteAllNotifications() )
        })
}
