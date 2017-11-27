import * as ActionTypes from '../actions/types'

const initialState = {
    team: { _id: '' },
    status: 0,
    msg: ''
}

const teamProfile = ( state = initialState, action ) => {
    switch ( action.type ) {
        case ActionTypes.RECEIVE_TEAM_PROFILE:
            return { team: action.team, status: 200, msg: '' }
        case ActionTypes.TEAM_PROFILE_NOT_FOUND:
            return { team: {}, status: 404, msg: action.msg }
        case ActionTypes.TEAM_PROFILE_NOT_ALLOWED:
            return { team: {}, status: 403, msg: action.msg }
        case ActionTypes.CHOOSE_TEAM_LEADER:
            return {
                ...state,
                team: {
                    ...state.team,
                    members: state.team.members.map( member => {
                        if ( member._id === action.userId ) {
                            member.isLeader = true
                            return member
                        }
                        member.isLeader = false
                        return member
                    })
                }
            }
        case ActionTypes.REMOVE_MEMBER_FROM_TEAM:
            return {
                ...state,
                team: {
                    ...state.team,
                    members: state.team.members.filter( member => member._id !== action.userId )
                }
            }
        default:
            return state
    }
}

export default teamProfile
