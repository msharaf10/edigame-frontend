import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from '../navbar.jsx';
import { SignupForAdmin, SignupForUser } from './signup-form.jsx';

class Main extends React.Component {
    constructor() {
        super();

        this.state = {
            isAdmin: false
        };
    }

    componentWillMount() {
        if ( window.location.href.indexOf( 'admin' ) > -1 ) {
            this.setState({
                isAdmin: true
            });
        }
    }

    render() {
        const Form = this.state.isAdmin ? <SignupForAdmin /> : <SignupForUser />;
        return (
            <div className='content-wrap'>
                <div className='content'>
                    { Form }
                </div>
            </div>
        );
    }
}

const root = document.getElementById( 'root' );
ReactDOM.render( <Main />, root );
