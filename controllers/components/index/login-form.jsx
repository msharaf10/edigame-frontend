import React from 'react';

import regex from '../helpers/regex';

export default class LoginForm extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            submitButton: 'Login',
            email: '',
            password: '',
            errorMessage: '',
            formIsValide: '',
            displayError: ''
        };

        this._checkEmptyFields = this._checkEmptyFields.bind( this );
        this._handleChange = this._handleChange.bind( this );
        this._loginUser = this._loginUser.bind( this );
        this._userInputIsValid = this._userInputIsValid.bind( this );
        this._redirectSignup = this._redirectSignup.bind( this );
    }

    _handleChange( e ) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [ name ]: value
        });
    }

    _checkEmptyFields( target, emptyFields ) {
        var emptyFeilds = [];
        for ( var i = 0; i < target.length; i++ ) {
            var child = target[i];
            if ( child.nodeName === 'INPUT' ) {
                if ( child.value == '' && child.hasAttribute( 'required' ) ) {
                    emptyFeilds.push( child );
                }
            }
        }
        return emptyFeilds;
    }

    _userInputIsValid( e ) {
        let form = document.forms[ 0 ];
        let emptyFeilds = this._checkEmptyFields( form );
        let emptyFeildsNames = [];

        if ( emptyFeilds.length ) {
            for ( var i in emptyFeilds ) {
                emptyFeildsNames.push( emptyFeilds[ i ].placeholder );
            }
        }

        if (  emptyFeildsNames.length ) {
            if ( emptyFeildsNames.length === 1 && emptyFeildsNames[ 0 ] == 'Email' ) {
                this.setState({
                    errorMessage: 'Missing email',
                    displayError: 'alert alert-danger',
                    submitButton: 'Login'
                });
                return false;
            } else if ( emptyFeildsNames.length === 1 && emptyFeildsNames[ 0 ] == 'Password') {
                this.setState({
                    errorMessage: 'Missing password',
                    displayError: 'alert alert-danger',
                    submitButton: 'Login'
                });
                return false;
            } else {
                this.setState({
                    errorMessage: 'Missing email and password',
                    displayError: 'alert alert-danger',
                    submitButton: 'Login'
                });
                return false;
            }
        }

        if ( !( regex.email ).test( this.state.email ) ) {
            this.setState({
                errorMessage: 'Wrong email',
                displayError: 'alert alert-danger',
                submitButton: 'Login'
            });
            return false;
        } else {
            return true;
        }
    }

    _loginUser( e ) {
        e.preventDefault();
        const that = this;

        this.setState({
            formIsValide: 'was-validated',
            submitButton: 'loading...',
            displayError: '',
            errorMessage: ''
        });

        if ( !this._userInputIsValid() ) {
            return false;
        }

        var data = {
            email: this.state.email,
            password: this.state.password
        }

        fetch( '/login', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify( data )
        }).then( function( res ) {
            if ( !res.ok ) return errorHandler( res );
            res.json().then( loginSuccess );
        }).catch( errorHandler );

        function loginSuccess( res ) {
            localStorage.token = res.token;
            window.location = '/';
        }

        function errorHandler( err, message ) {
            if ( err.status >= 400 && err.status < 500 )
                return err.text().then( function( message ) {
                    that.setState({
                        errorMessage: message,
                        submitButton: 'Login',
                        displayError: 'alert alert-danger'
                    });
                });
            if ( message ) return that.setStatus({
                errorMessage: message,
                submitButton: 'Login',
                displayError: 'alert alert-danger'
            });
            return that.setState({
                errorMessage: 'Sorry there\'s a problem with connection, please try again later',
                submitButton: 'Login',
                displayError: 'alert alert-danger'
            });
        }
    }

    _redirectSignup( e ) {
        e.preventDefault();
        window.location = '/signup';
    }

    render() {
        return (
            <div className = 'container'>
                <div className = 'title-wrap'>
                    <h2 className = 'login-title'>
                        <span className = 'subtitle-painted'>Edi</span>
                        games
                    </h2>
                </div>
                <div className = 'login-form-wrap'>
                    <form className = { 'login-form ' + this.state.formIsValide }>
                        <div className = { this.state.displayError } role = 'alert'>{ this.state.errorMessage }</div>
                        <div className = 'form-group'>
                            <input autoFocus className = 'form-control form-control-sm' type = 'email' name='email' onChange = { this._handleChange } placeholder = 'Email' value = { this.state.email } required />
                            <input className = 'form-control form-control-sm' type = 'password' name = 'password' onChange = { this._handleChange } placeholder = 'Password' value={ this.state.password } required />
                            <button className = 'btn btn-outline-success btn-sm' onClick = { this._loginUser }>
                                { this.state.submitButton }
                            </button>
                            <button className = 'btn btn-outline-primary btn-sm' onClick = { this._redirectSignup }>
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
