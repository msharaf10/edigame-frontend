import React from 'react';
import minified from 'minified';

import regex from '../helpers/regex';

export default class SignupForm extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            formIsValide: '',
            errorMessage: '',
            displayError: '',
            usernameToken: '',
            submitButton: 'Create account',
            firstName: '',
            lastName: '',
            phone: '',
            email: '',
            password: '',
            checkPassword: '',
            companyName: '',
            isAdmin: ''
        };

        this._handleChange = this._handleChange.bind( this );
        this._userInputIsValid = this._userInputIsValid.bind( this );
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

    _userInputIsValid() {

        let form = document.forms[ 0 ];
        let emptyFeilds = this._checkEmptyFields( form );
        let emptyFeildsNames = [];

        if ( emptyFeilds.length ) {
            for ( var i in emptyFeilds ) {
                emptyFeildsNames.push( emptyFeilds[ i ].placeholder );
            }
        }

        if (  emptyFeildsNames.length ) {
            if ( emptyFeildsNames.length <= 3 ) {
                var keyword = emptyFeildsNames.length === 1 ? 'field!' : 'fields!';
                this.setState({
                    errorMessage: 'please fill - ' + emptyFeildsNames.toString() + ' - ' + keyword,
                    displayError: 'alert alert-danger',
                    submitButton: 'Create account'
                });
                return false;
            } else {
                this.setState({
                    errorMessage: 'please fill in required fields!',
                    displayError: 'alert alert-danger',
                    submitButton: 'Create account'
                });
                return false;
            }
        } else {
            this.setState({
                errorMessage: '',
                displayError: '',
            });
        }

        if ( !(regex.email).test( this.state.email ) ) {
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

        // TODO validat phone

        if ( this.state.phone.length > 11 || this.state.phone.length <= 10 ) {
            this.setState({
                errorMessage: 'Wrong phone',
                displayError: 'Please insert a valid phone',
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
            formIsValide: 'was-validated',
            submitButton: 'loading...'
        });

        if ( !this._userInputIsValid() ) {
            return false;
        }

        var data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            username: this.state.username,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            companyName: this.state.companyName,
            isAdmin: this.state.isAdmin
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
            setTimeout( function() {
                window.location = '/';
            }, 3000 );
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
                            <input className = 'form-control form-control-sm' value = { this.state.username } onChange = { this._handleChange } placeholder = 'Username' name = 'username' required />
                            <div className = 'invalid-feedback'>{ this.state.usernameToken }</div>
                        </div>
                        <div className = 'form-group'>
                            <input className = 'form-control form-control-sm' value = { this.state.email } onChange = { this._handleChange } type = 'email' placeholder = 'email' name = 'email' required />
                        </div>
                        <div className = 'form-group'>
                            <input className = 'form-control form-control-sm' value = { this.state.password } onChange = { this._handleChange } type = 'password' placeholder = 'password' name = 'password' required />
                        <div className = 'invalid-feedback'>{ this.state.checkPassword }</div>
                        </div>
                        <div className = 'form-group'>
                            <input className = 'form-control form-control-sm' value = { this.state.companyName } onChange = { this._handleChange } placeholder = 'Company name' name = 'companyName' required />
                        </div>
                        <button onClick = { this._signupUser } className = 'btn btn-primary'>{ this.state.submitButton }</button>
                    </form>
                </div>
            </div>
        );
    }
}
