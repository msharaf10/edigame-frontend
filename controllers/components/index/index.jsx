import React from 'react';
import ReactDOM from 'react-dom';

import LoginForm from './login-form.jsx';
import Navbar from '../navbar.jsx';

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
        const content = this.tokenIsValid( localStorage.token ) ? <Navbar /> : <LoginForm />;
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
    <Main />,
    root
);
