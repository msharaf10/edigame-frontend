import * as ActionTypes from '../actions/types'

const initialState = {
    users: []
}

const users = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ActionTypes.RECEIVE_USER:
            let { users } = action
            return { users }
        default:
            return state
    }
}

export default users
