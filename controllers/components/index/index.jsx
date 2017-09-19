import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router , Route, Link } from 'react-router-dom';
import helpers from '../helpers/helpers';

// ----------  All required components  ---------- //
import Navbar from '../navbar.jsx';
import LoginForm from './login-form.jsx';
import SignupForm from '../signup/signup-form.jsx';
import Users from '../users/users.jsx';
import Settings from '../settings/settings.jsx';
import userTeams from '../teams/user-teams.jsx';
import Teams from '../teams/teams.jsx';
//import CreateTeam from '../teams/create-team.jsx';
import getTeam from '../team/get-team.jsx';
import Search from '../search/search.jsx';

class LoginOrSignup extends React.Component {

    render() {
        const url = window.location.pathname;

        if ( url === '/' ) {
            return <LoginForm />;
        } else if ( url === '/signup' ) {
            return null;
        } else {
            return <h2>popup login</h2>;
        }
    }
}

class Main extends React.Component {

    render() {
        const content = helpers.getToken() ? <Navbar /> : <LoginOrSignup />;
        return (
            <div className='content-wrap'>
                <div className='content'>
                    { content }
                </div>
            </div>
        );
    }
}

const root = document.getElementById( 'root' );
ReactDOM.render(
    <Router>
        <div>
            <Route path = '/' component = { Main } />
            <Route path = '/login' component = { LoginForm } />
            <Route path = '/signup' component = { SignupForm } />
            <Route path = '/players' component = { Users } />
            <Route path = '/settings' component = { Settings } />
            <Route path = '/teams/my-teams' component = { userTeams } />
            <Route path = '/teams' component = { Teams } exact />
            <Route path = '/team/:name' component = { getTeam } />
            <Route path = '/search' component = { Search } />
        </div>
    </Router>,
    root
);
