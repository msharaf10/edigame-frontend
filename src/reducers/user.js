import * as ActionTypes from '../actions/types'
import { removeToken } from '../helpers/auth'

const initialState = {
    payload: { id: '' },
    teams: [],
    requests: [],
    notifications: []
}

const user = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ActionTypes.LOGOUT_USER:
            removeToken()
            return { ...state }
        case ActionTypes.RECEIVE_USER:
            let { payload } = action
            return {
                ...state,
                payload
            }
        case ActionTypes.RECEIVE_TEAMS_OF_USER:
            let { teams } = action
            return {
                ...state,
                teams
            }
        case ActionTypes.RECEIVE_REQUESTS:
            let { requests } = action
            return {
                ...state,
                requests
            }
        case ActionTypes.RECEIVE_NOTIFICATIONS:
            let { notifications } = action
            return {
                ...state,
                notifications
            }
        default:
            return state
    }
}

export default user
