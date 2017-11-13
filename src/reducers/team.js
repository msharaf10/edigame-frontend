import * as ActionTypes from '../actions/types'

const initialState = {
    about: {},
    author: {},
    membersInfo: []
}

const team = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ActionTypes.RECEIVE_TEAM:
            let { id, name, started, finished, members, company, author, membersInfo } = action
            let about = { id, name, started, finished, members }
            return {
                about,
                author,
                membersInfo
            }
        default:
            return state
    }
}

export default team
