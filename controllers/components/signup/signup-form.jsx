import React from 'react';
import minified from 'minified';

export default class SignupForm extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            errorMessage: '',
            usernameToken: '',
            submitButton: 'Create account',
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            companyName: '',
            isAdmin: ''
        };
        this._handleChange = this._handleChange.bind( this );
        this._validateUserInput = this._validateUserInput.bind( this );
        this._signupUser = this._signupUser.bind( this );
    }

    _handleChange( e ) {}
    _validateUserInput( e ) {}
    _signupUser( e ) {}

    render() {
        return ();
    }
}
