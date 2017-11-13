import { combineReducers } from 'redux'
import user from './user'
import users from './users'
import team from './team'
import teams from './teams'
import filter from './filter'

const rootReducer = combineReducers({
    user,
    users,
    team,
    teams,
    filter
})

export default rootReducer
