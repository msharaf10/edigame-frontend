import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router , Route, Link } from 'react-router-dom';

// ----------  All required components  ---------- //
import Navbar from '../navbar.jsx';
import LoginForm from './login-form.jsx';
import SignupForm from '../signup/signup-form.jsx';
import Users from '../users/users.jsx';
// settings
// teams
// tesms/create
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

    tokenIsValid ( token ) {
        if ( !token ){
            return false;
        } else if ( token ) {
            const user = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );
            if ( !user.hasOwnProperty( 'id' ) )
                return false;
            else if ( !user )
                return false;
            return true;
        }
    }

    render() {
        const content = this.tokenIsValid( localStorage.token ) ? <Navbar /> : <LoginOrSignup />;
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
            <Route path = '/teams' component = { Teams } />
            <Route path = '/teams/create' component = { CreateTeams } />
            <Route path = '/team/:name' component = { getTeam } />
            <Route path = '/search' component = { Search } />
        </div>
    </Router>,
    root
);
