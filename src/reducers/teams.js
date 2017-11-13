import * as ActionTypes from '../actions/types'

const initialState = {
    teams: []
}

const teams = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ActionTypes.RECEIVE_TEAMS:
            let { teams } = action
            return { teams }
        default:
            return state
    }
}

export default teams
