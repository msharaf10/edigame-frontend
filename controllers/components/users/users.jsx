import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from '../navbar.jsx';

class FetchUsers extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            users: [],
            message: '',
            displayError: '',
            errorMessage: ''
        };
        this._addPlayer = this._addPlayer.bind( this );
        this._removePlayer = this._removePlayer.bind( this );
    }

    componentDidMount() {
        this._fetchUsers();
    }

    _fetchUsers() {
        const that = this;

        // TODO clean fetch and define global errorHandler function
        fetch( '/users/get-all-users')
        .then( function( res ) {
            if ( !res.ok ) return that._errorHandler( err );
            res.json().then( ( users ) => { that.setState({ users }) });
        }).catch( ( err ) => { alert ( err ) } );
    }

    _addPlayer( e ) {
        e.preventDefault();

        const playerId = e.target.getAttribute( 'data-id' );
        const admin = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );

        this.setState({
            errorMessage: '',
            displayError: ''
        });

        this._pushPlayerToTeam( playerId, admin.team )
    }

    _removePlayer( e ) {
        e.preventDefault();

        const playerId = e.target.getAttribute( 'data-id' );
        const admin = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );

        this.setState({
            errorMessage: '',
            displayError: ''
        });

        this._removePlayerFromTeam( playerId, admin.team )
    }

    _removePlayerFromTeam( playerId, team ) {
        const that = this;

        let data = {
            playerId: playerId,
            teamId: team
        };

        fetch( '/api/teams/remove/player', {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.token
            },
            method: 'POST',
            body: JSON.stringify( data )
        }).then( removePlayerSuccess )
        .catch( that._errorHandler );

        function removePlayerSuccess( res ) {
            if ( !res.ok ) return that._errorHandler( res );

            that.setState({
                errorMessage: 'Player removed :(',
                displayError: 'alert alert-success'
            });
        }
    }

    _pushPlayerToTeam( playerId, team ) {
        const that = this;

        let data = {
            playerId: playerId,
            teamId: team
        };

        fetch( '/api/teams/add/player', {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.token
            },
            method: 'POST',
            body: JSON.stringify( data )
        }).then( addPlayerSuccess )
        .catch( that._errorHandler );

        function addPlayerSuccess( res ) {
            if ( !res.ok ) return that._errorHandler( res );

            that.setState({
                errorMessage: 'Player added :)',
                displayError: 'alert alert-success'
            });
        }
    }

    _errorHandler( err, message ) {
        const that = this;
        if ( err.status >= 400 && err.status < 500 )
            return err.text().then( function( message ) {
                that.setState({
                    errorMessage: message,
                    displayError: 'alert alert-danger'
                });
            });
        if ( message ) return that.setStatus({
            errorMessage: message,
            displayError: 'alert alert-danger'
        });
        alert( message );
        return that.setState({
            errorMessage: 'Sorry there\'s a problem with connection, please try again later',
            displayError: 'alert alert-danger'
        });
    }

    _addPlayerButton( user ) {
        if ( localStorage.token ) {
            const admin = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );
            if ( admin.isAdmin ) {
                if ( admin.team ) {
                    if ( !user.team ) {
                        return <button className = 'btn btn-info btn-xs' onClick = { this._addPlayer } data-id = { user._id }>Add Player</button>;
                    } else if ( user.team == admin.team ) {
                        return <button className = 'btn btn-danger btn-xs' onClick = { this._removePlayer } data-id = { user._id }>Remove Player</button>;
                    } else {
                        return '';
                    }
                } else {
                    return '';
                }
            } else {
                return '';
            }
        } else {
            return '';
        }
    }

    _showUsers() {
        const users = this.state.users.map( ( user, i ) => {
            const style = { backgroundPosition: user.profPic.x + 'px '  + user.profPic.y + 'px' }

            if ( !user.isAdmin ) {
                return (
                    <div className = 'col-6 col-sm-3 user-wrap'>
                        <div className = 'user-details-wrap'>
                            <ul className = 'user-list-wrap' key = { i }>
                                <li className = 'user-item user-name-wrap'>
                                    <span style = { style }className = 'user-pic d-inline-block align-top'></span>
                                    <span>{ user.firstName + ' ' + user.lastName }</span>
                                </li>
                                <li className = 'user-item'>email: { user.email }</li>
                                <li className = 'user-item'>phone: { user.phone }</li>
                                { this._addPlayerButton( user ) }
                            </ul>
                        </div>
                    </div>
                );
            } else {
                return '';
            }
        });
        return users;
    }

    render() {
        return (
            <div>
                <div className = 'container'>
                    <h1>Fetch for players</h1>
                    <div className = { this.state.displayError } role = 'alert'>{ this.state.errorMessage }</div>
                    <div className = 'row'>{ this._showUsers() }</div>
                </div>
            </div>
        );
    }
}

class Main extends React.Component {

    render() {
        const navbar = localStorage.token ? <Navbar /> : '';
        return (
            <div>
                { navbar }
                <FetchUsers />
            </div>
        );
    }
}

const root = document.getElementById( 'root' );
ReactDOM.render( <Main />, root );
