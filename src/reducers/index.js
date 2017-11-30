import { combineReducers } from 'redux'
import profile from './profile'
import user from './user'
import users from './users'
import teamProfile from './team'
import teams from './teams'
import filter from './filter'

const rootReducer = combineReducers({
    profile,
    user,
    users,
    teamProfile,
    teams,
    filter
})

export default rootReducer
