import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

// ----------  Containers  ---------- //
import App from './App'
import Login from './auth/Login'
import Signup from './auth/Signup'
import SettingsPage from './SettingsPage'
import ResetPassword from './auth/ResetPassword'
import ForgotPassword from './auth/ForgotPassword'
import UserPage from './UserPage'
import UsersPage from './UsersPage'
import TeamsPage from './TeamsPage'
import CreateTeamPage from './CreateTeamPage'
import TeamsOfUserPage from './TeamsOfUserPage'
import TeamPage from './TeamPage'
import SearchPage from './SearchPage'
import HelpPage from './HelpPage'

const Root = ({ store }) => (
    <Provider store = { store }>
        <div style = {{ fontFamily: 'sans-serif' }}>
            <Route path = '/' component = { App } />
            <Route path = '/login' component = { Login } />
            <Route path = '/signup' component = { Signup } />
            <Route path = '/settings' component = { SettingsPage } />
            <Route path = '/reset-password' component = { ResetPassword } />
            <Route path = '/forgot-password' component = { ForgotPassword } />
            <Route path = '/users/:q' component = { UserPage } />
            <Route path = '/users' component = { UsersPage } exact />
            <Route path = '/teams' component = { TeamsPage } exact />
            <Route path = '/my-teams' component = { TeamsOfUserPage } />
            <Switch>
                <Route path = '/teams/create' component = { CreateTeamPage } />
                <Route path = '/teams/:q' component = { TeamPage } />
            </Switch>
            <Route path = '/search' component = { SearchPage } />
            <Route path = '/help' component = { HelpPage } />
        </div>
    </Provider>
)

Root.propTypes = {
    store: PropTypes.object.isRequired
}
export default Root
