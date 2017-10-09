import React from 'react';

import helpers from '../helpers/helpers';

const user = helpers.getToken();

class CreateTeamForm extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            formIsValide: '',
            errorMessage: '',
            displayError: '',
            submitButton: 'Create team',
            teamName: '',
            companyName: ''
        };

        this._handleChange = this._handleChange.bind( this );
        this._adminInputIsValid = this._adminInputIsValid.bind( this );
        this._createTeam = this._createTeam.bind( this );
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

    _adminInputIsValid() {

        let form = document.forms[ 'create-new-team' ];
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
                    submitButton: 'Create team'
                });
                return false;
            } else {
                this.setState({
                    errorMessage: 'please fill in required fields!',
                    displayError: 'alert alert-danger',
                    submitButton: 'Create team'
                });
                return false;
            }
        } else {
            this.setState({
                errorMessage: '',
                displayError: '',
            });
        }


        if ( !( helpers.regex.stringHasSpace ).test( this.state.teamName ) ) {
            this.setState({
                errorMessage: 'Only characters, numbers, underscore and dashes are valide names',
                displayError: 'alert alert-danger',
                submitButton: 'Create team'
            });
            return false;
        }

        if ( this.state.teamName.length <= 7 ) {
            this.setState({
                errorMessage: 'Team length must be more than 7 chars',
                displayError: 'alert alert-danger',
                submitButton: 'Create team'
            });
            return false;
        }

        if ( this.state.companyName !== user.companyName ) {
            this.setState({
                errorMessage: 'Please insert your company name',
                displayError: 'alert alert-danger',
                submitButton: 'Create team'
            });
            return false;
        }

        return true;
    }

    _createTeam( e ) {
        e.preventDefault();
        const that = this;

        this.setState({
            formIsValide: 'was-validated',
            submitButton: 'loading...'
        });

        if ( !this._adminInputIsValid() ) {
            return false;
        }

        let random_avatar = 'ava_' + ( Math.round( Math.random() * 7 ) + 1 );

        var data = {
            teamName: this.state.teamName,
            companyName: this.state.companyName,
            adminId: user.id
        }

        fetch( '/teams/create', {
    	    headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.token
            },
    	    method: 'POST',
    	    body: JSON.stringify( data )
    	}).then( newTeamSuccess )
    	.catch( errorHandler );

        function newTeamSuccess( res ) {
            if ( !res.ok ) return errorHandler( res );

            that.setState({
                errorMessage: that.state.teamName + ' Created Successfully',
                displayError: 'alert alert-success'
            });
            setTimeout( function() {
                window.location = '/team/' + data.teamName;
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
            if ( message ) return that.setState({
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
                    <h2 className = 'signup-title'>Create New Team</h2>
                </div>
                <div className = 'newteam-form-wrap'>
                    <form className = { 'newteam-form ' + this.state.formIsValide } name = 'create-new-team'>
                        <div className = { this.state.displayError } role = 'alert'>{ this.state.errorMessage }</div>
                            <div className = 'form-group'>
                                <input className = 'form-control form-control-sm' value = { this.state.teamName } onChange = { this._handleChange } placeholder = 'Team Name' name = 'teamName' autoFocus required />
                            </div>
                            <div className = 'form-group'>
                                <input className = 'form-control form-control-sm' value = { this.state.companyName } onChange = { this._handleChange } placeholder = 'Company Name' name = 'companyName' required />
                            </div>
                        <button onClick = { this._createTeam } className = 'btn btn-primary'>{ this.state.submitButton }</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default class CreateTeam extends React.Component {
    render() {
        return (
            <div className='content-wrap'>
                <div className='content'>
                    <CreateTeamForm />
                </div>
            </div>
        );
    }
}
