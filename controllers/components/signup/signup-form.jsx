import React from 'react';

import helpers from '../helpers/helpers';

export default class SignupForm extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            formIsValide: '',
            errorMessage: '',
            displayError: '',
            usernameToken: '', // TODO check if username is token or length < 5 chars
            submitButton: 'Create account',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            checkPassword: ''
        };

        this._handleChange = this._handleChange.bind( this );
        this._signupUser = this._signupUser.bind( this );
    }

    _handleChange( e ) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [ name ]: value
        });

        if ( [ name ] == 'password' ) {
            if ( value.length <= 5 ) {
                this.setState({
                    checkPassword: 'Week password'
                });
            } else if ( value.length < 9 ) {
                this.setState({
                    checkPassword: 'semi strong password'
                });
            } else {
                this.setState({
                    checkPassword: ''
                });
            }
        }
    }

    _checkEmptyFields( target, emptyFields ) {
        var emptyFields = [];
        for ( var i = 0; i < target.length; i++ ) {
            var child = target[i];
            if ( child.nodeName === 'INPUT' ) {
                if ( child.value == '' && child.hasAttribute( 'required' ) ) {
                    emptyFields.push( child );
                }
            }
        }
        return emptyFields;
    }

    _userInputIsValid() {

        let form = document.forms[ 0 ];
        let emptyFields = this._checkEmptyFields( form );
        let emptyFieldsNames = [];

        if ( emptyFields.length ) {
            for ( var i in emptyFields ) {
                emptyFieldsNames.push( emptyFields[ i ].placeholder );
            }
        }

        let errorField = false;

        emptyFieldsNames.forEach( ( field ) => {
            if ( errorField ) return;

            if ( emptyFieldsNames.length && field === 'First name' )
                errorField = 'Missing ' + field;

            if ( emptyFieldsNames.length && field === 'Last name' )
                errorField = 'Missing ' + field;

            if ( emptyFieldsNames.length && field === 'Phone' )
                errorField = 'Missing ' + field;

            if ( emptyFieldsNames.length && field === 'Username' )
                errorField = 'Missing ' + field;

            if ( emptyFieldsNames.length && field === 'Email' )
                errorField = 'Missing ' + field;

            if ( emptyFieldsNames.length && field === 'Password' )
                errorField = 'Missing ' + field;
        });

        if ( errorField ) {
            this.setState({
                errorMessage: errorField,
                displayError: 'alert alert-danger',
                submitButton: 'Create account'
            });
            return false;
        }

        if ( !( helpers.regex.email ).test( this.state.email ) ) {
            this.setState({
                errorMessage: 'Wrong email',
                displayError: 'alert alert-danger',
                submitButton: 'Create account'
            });
            return false;
        }

        if ( this.state.password.length < 5 ) {
            this.setState({
                errorMessage: 'Week password',
                displayError: 'alert alert-danger',
                submitButton: 'Create account'
            });
            return false;
        }

        if ( !( helpers.validPhone( this.state.phone ) ) ) {
            this.setState({
                errorMessage: 'Please insert a valid phone',
                displayError: 'alert alert-danger',
                submitButton: 'Create account'
            });
            return false;
        }

        return true;
    }

    _signupUser( e ) {
        e.preventDefault();
        const that = this;

        this.setState({
            errorMessage: '',
            displayError: '',
            formIsValide: 'was-validated',
            submitButton: 'loading...'
        });

        if ( !this._userInputIsValid() ) {
            return false;
        }

        // set background position x, y
        let x = Math.round(Math.random() * 110 );
        let y = Math.round(Math.random() * 20 );

        if ( x === 0 ) { x = x; } else { x = -x; }
        if ( y === 0 ) { y = y; } else { y = -y; }

        var data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            isAdmin: false,
            profPic: {
                x: x.toString(),
                y: y.toString()
            }
        }

        fetch( '/signup', {
    	    headers: { 'Content-Type': 'application/json' },
    	    method: 'POST',
    	    body: JSON.stringify( data )
    	}).then(function( res ) {
    	    if ( !res.ok ) return errorHandler( res );
    	    res.json().then( signupSuccess );
    	}).catch( errorHandler );

        function signupSuccess( res ) {
            alert( 'success' );
            localStorage.token = res.token;
            that.setState({
                errorMessage: 'Registered Successfully',
                displayError: 'alert alert-success'
            });
            window.location = '/';
        }

        function errorHandler( err, message ) {
            if ( err.status >= 400 && err.status < 500 )
                return err.text().then( function( message ) {
                    that.setState({
                        errorMessage: message,
                        displayError: 'alert alert-danger',
                        submitButton: 'Create account'
                    });
                });
            if ( message ) return that.setStatus({
                errorMessagemessage: message,
                displayError: 'alert alert-danger',
                submitButton: 'Create account'
            });
            return that.setState({
                errorMessage: 'Sorry there\'s a problem with connection, please try again later',
                displayError: 'alert alert-danger',
                submitButton: 'Create account'
            });
        }
    }

    render() {
        const usernameNote = 'NOTE: Choose username carefully which will be your name to other teammates and get used for searching';
        return (
            <div className = 'container'>
                <div className = 'title-wrap'>
                    <h2 className = 'signup-title'>Sign up</h2>
                    <p>Have account? <a href = '/' className = 'redirect-login'>Login</a></p>
                </div>
                <div className = 'signup-form-wrap'>
                    <form className = { 'signup-form ' + this.state.formIsValide }>
                        <div className = { this.state.displayError } role = 'alert'>{ this.state.errorMessage }</div>
                        <div className = 'form-row'>
                            <div className = 'form-group col'>
                                <input className = 'form-control form-control-sm' value = { this.state.firstName } onChange = { this._handleChange } placeholder = 'First name' name = 'firstName' autoFocus required />
                            </div>
                            <div className = 'form-group col'>
                                <input className = 'form-control form-control-sm' value = { this.state.lastName } onChange = { this._handleChange } placeholder = 'Last name' name = 'lastName' required />
                            </div>
                        </div>
                        <div className = 'form-group'>
                            <input className = 'form-control form-control-sm' value = { this.state.phone } onChange = { this._handleChange } placeholder = 'Phone' name = 'phone' required />
                        </div>
                        <div className = 'form-group'>
                            <input className = 'form-control form-control-sm username-tooltip' value = { this.state.username } onChange = { this._handleChange } placeholder = 'Username' name = 'username' data-toggle = 'tooltip' data-placement = 'left' title = { usernameNote } required />
                            <div className = 'invalid-feedback'>{ this.state.usernameToken }</div>
                        </div>
                        <div className = 'form-group'>
                            <input className = 'form-control form-control-sm' value = { this.state.email } onChange = { this._handleChange } type = 'email' placeholder = 'Email' name = 'email' required />
                        </div>
                        <div className = 'form-group'>
                            <input className = 'form-control form-control-sm' value = { this.state.password } onChange = { this._handleChange } type = 'password' placeholder = 'Password' name = 'password' required />
                        <div className = 'invalid-feedback'>{ this.state.checkPassword }</div>
                        </div>
                        <button onClick = { this._signupUser } className = 'btn btn-primary'>{ this.state.submitButton }</button>
                    </form>
                </div>
            </div>
        );
    }
}
