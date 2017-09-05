import React from 'react';
import ReactDOM from 'react-dom';

import SignupForm from './signup-form.jsx';

class Main extends React.Component {
    tokenIsValid ( token ) {
        if ( !token ){
            return false;
        } else if ( token ) {
            const userToken = JSON.parse( atob( token.split( '.' )[ 1 ] ) );
            if ( !userToken.hasOwnProperty( 'id' ) )
                return false;
            else if ( !userToken )
                return false;
            return true;
        }
    }
    render() {
        const content = this.tokenIsValid( localStorage.token ) ? <h1>Not allowd</h1> : <SignupForm />;
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
