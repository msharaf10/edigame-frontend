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
        this._handleClick = this._handleClick.bind( this );
    }

    componentDidMount() {
        this._fetchUsers();
    }

    _fetchUsers() {
        const that = this;

        // TODO clean fetch and define global errorHandler function
        fetch( '/users/get-all-users')
        .then( function( res ) {
            if ( !res.ok ) return alert( 'failed to fetch users' );
            res.json().then( ( users ) => { that.setState({ users }) });
        }).catch( ( err ) => { alert ( err ) } );
    }

    _handleClick( e ) {
        e.preventDefault();

        const playerId = e.target.getAttribute( 'data-id' );
        const admin = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );

        this.setState({
            errorMessage: '',
            displayError: ''
        });

        if ( !admin.team ) {
            alert( 'you cant add players create-new-team first' );
        } else {

            this._addPlayer( playerId, admin.team )
        }
    }

    _addPlayer( playerId, team ) {
        const that = this;

        let data = {
            playerId: playerId,
            teamId: team
        };

        fetch( '/teams/add-player', {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': localStorage.token
            },
            method: 'POST',
            body: JSON.stringify( data )
        }).then( function( res ) {
            if ( !res.ok ) return errorHandler( res );
            res.json().then (addPlayerSuccess);
        }).catch( errorHandler );

        function addPlayerSuccess() {
            return that.setStatus({
                errorMessage: 'Player added :)',
                displayError: 'alert alert-success'
            });
        }

        function errorHandler( err, message ) {
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
            return that.setState({
                errorMessage: 'Sorry there\'s a problem with connection, please try again later',
                displayError: 'alert alert-danger'
            });
        }
    }

    _addPlayerButton( id ) {
        if ( localStorage.token ) {
            const user = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );
            if ( user.isAdmin ) {
                if ( user.id !== id ) {
                    return <button className = 'btn btn-info btn-sm' onClick = { this._handleClick } data-id = { id }>Show Name</button>;
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

    render() {
        // TODO put the following in a new component or method in current component
        // TODO pass this.state.user to new array then use filter method to remove current user
        const users = this.state.users.map( ( user, i ) => {
            const style = { backgroundPosition: user.profPic.x + 'px '  + user.profPic.y + 'px' }
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
                            { this._addPlayerButton( user._id ) }
                        </ul>
                    </div>
                </div>
            );
        });

        return (
            <div>
                <div className = 'container'>
                    <h1>Fetch for players</h1>
                    <div className = { this.state.displayError } role = 'alert'>{ this.state.errorMessage }</div>
                    <div className = 'row'>{ users }</div>
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
