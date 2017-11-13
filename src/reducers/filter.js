import * as ActionTypes from '../actions/types'

const filter = ( state = ActionTypes.SHOW_ALL, action ) => {
    switch ( action.type ) {
        case ActionTypes.SET_SEARCH_FILTER:
            return action.filter
        default:
            return state
    }
}

export default filter
