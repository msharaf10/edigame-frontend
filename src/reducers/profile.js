import * as ActionTypes from '../actions/types'

const initialState = {
    user: { _id: '' },
    msg: ''
}

const profile = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ActionTypes.RECEIVE_USER_PROFILE:
            let { user } = action
            return { user, msg: '' }
        case ActionTypes.USER_PROFILE_NOT_FOUND:
            let { msg } = action
            return { user: {}, msg }
        default:
            return state
    }
}
export default profile
