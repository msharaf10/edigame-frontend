import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from '../navbar.jsx';

class Main extends React.Component {
    constructor( props ) {
        super( props );

    }

    render() {
        // TODO get team name from ulr and compare it with user.teamName
        const isUser = localStorage.token ? true : false;
        if ( isUser ) {
            var user = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );
            if ( user.isAdmin ) {
                return (
                    <div>
                        <Navbar />
                        <div className = 'container'>
                            <h1>You are admin</h1>
                            <h2>content goes here</h2>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Navbar />
                        <div className = 'container'>
                            <h1>You are user</h1>
                            <h2>content goes here</h2>
                        </div>
                    </div>
                );
            }
        } else {
            return <h1>return normal team page</h1>
        }
    }
}
const root = document.getElementById( 'root' );
ReactDOM.render( <Main />, root );
