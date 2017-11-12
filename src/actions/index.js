import * as ActionTypes from './types'
import { loadToken, removeToken, options } from '../helpers/auth'

/* Action creatores */
const receiveUser = payload => ({
    type: ActionTypes.RECEIVE_USER,
    payload
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

/* Async actions */
export const fetchUserData = id => dispatch => {
    let fetchRequests = [
        fetch( `/api/users/${ id }`, options() ),
        fetch( '/api/notifications', options() ),
        fetch( '/api/requests/teams', options() )
    ]
    return Promise.all( fetchRequests )
        .then( res => {
            if ( res[ 0 ].status === 200 && res[ 1 ].status === 200 && res[ 2 ].status === 200 ) {
                res[ 0 ].json().then( user =>
                    dispatch( receiveUser( user ) ) )
                res[ 1 ].json().then( notifications =>
                    dispatch( receiveNotifications( notifications ) ) )
                res[ 2 ].json().then( requests =>
                    dispatch( receiveRequests( requests ) ) )
            } else {
                removeToken()
            }
        })
}

export const fetchTeamsOfUser = id => dispatch => {
    return fetch( `/api/teams/users/${ id }`, options() )
        .then( res => res.json() )
        .then( teams => dispatch( receiveTeamOfUser( teams ) ) )
}
