import * as ActionTypes from '../actions/types'

const initialState = {
    array: [],
    msg: ''
}

const teams = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ActionTypes.RECEIVE_TEAMS:
            let { teams } = action
            return { array: teams, msg: '' }
        case ActionTypes.TEAMS_NOT_ALLOWED:
            let { msg } = action
            return { array: [], msg }
        default:
            return state
    }
}

export default teams
