import React from 'react';

export default class LoginForm extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            submitButton: 'Login',
            email: '',
            password: '',
            errorMessage: '',
        };

        this._handleChange = this._handleChange.bind( this );
        this._loginUser = this._loginUser.bind( this );
        this._validateUserInput = this._validateUserInput.bind( this );
    }

    _handleChange( e ) {}
    _validateUserInput( e ) {}
    _loginUser( e ) {}
    _redirectSignup( e ) {}

    render() {
        return ();
    }
}
