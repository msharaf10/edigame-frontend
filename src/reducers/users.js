import * as ActionTypes from '../actions/types'

const users = ( state = [], action ) => {
    switch ( action.type ) {
        case ActionTypes.RECEIVE_USERS:
            return action.users
        case ActionTypes.USER_PROMOTED:
            return state.map( user => {
                if ( user._id === action.id )
                    user.role = 'Admin'
                return user
            })
        case ActionTypes.USER_DEMOTED:
            return state.map( user => {
                if ( user._id === action.id )
                    user.role = 'Client'
                return user
            })
        default:
            return state
    }
}

export default users
