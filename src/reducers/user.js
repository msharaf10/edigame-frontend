import * as ActionTypes from '../actions/types'
import { removeToken } from '../helpers/auth'

const initialState = {
    payload: { _id: '' },
    teams: [],
    requests: [],
    sentRequests: [],
    notifications: []
}

const user = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ActionTypes.LOGOUT_USER:
            removeToken()
            return state
        case ActionTypes.RECEVE_USER_DATA:
            const { data } = action
            return {
                ...state,
                payload: data.user,
                notifications: data.notifications,
                requests: data.teamRequests
            }
        case ActionTypes.RECEIVE_USER:
            return {
                ...state,
                payload: action.payload
            }
        case ActionTypes.RECEIVE_TEAMS_OF_USER:
            return {
                ...state,
                teams: action.teams
            }
        case ActionTypes.RECEIVE_REQUESTS:
            return {
                ...state,
                requests: action.requests
            }
        case ActionTypes.REMOVE_TEAM_REQUEST:
            return {
                ...state,
                requests: state.requests.filter( req => req.teamId !== action.teamId )
            }
        case ActionTypes.RECEIVE_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.notifications
            }
        case ActionTypes.RECEIVE_SENT_TEAM_REQUESTS:
            return {
                ...state,
                sentRequests: action.requests
            }
        case ActionTypes.DELETE_ONE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter( n => n._id !== action.id )
            }
        case ActionTypes.DELETE_ALL_NOTIFICATIONS:
            return { ...state, notifications: [] }
        default:
            return state
    }
}

export default user
