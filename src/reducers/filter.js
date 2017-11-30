import * as ActionTypes from '../actions/types'

const initialState = {
    user: '',
    team: ''
}

const filter = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ActionTypes.SET_FILTER_USER:
            return { ...state, user: action.value }
        case ActionTypes.SET_FILTER_TEAM:
            return { ...state, team: action.value }
        case ActionTypes.REMOVE_FILTER:
            return initialState
        default:
            return state
    }
}

export default filter
