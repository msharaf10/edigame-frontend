import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from '../navbar.jsx';

class FetchUsers extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            users: [],
            message: ''
        };
        this._addPlayer = this._addPlayer.bind( this );
    }

    componentDidMount() {
        this._fetchUsers();
    }

    _fetchUsers() {
        const that = this;

        fetch( '/users/get-all-users')
        .then( function( res ) {
            if ( !res.ok ) return alert( 'failed to fetch users' );
            res.json().then( ( users ) => { that.setState({ users }) });
        }).catch( ( err ) => { alert ( err ) } );
    }

    _addPlayer( e ) {
        e.preventDefault();
        const user = e.target.getAttribute( 'data-id' );
        const admin = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );

        if ( !admin.team ) {
            alert( 'you cant add players create-new-team first' );
        }
    }

    _addPlayerButton( id ) {
        if ( localStorage.token ) {
            const user = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );
            if ( user.isAdmin ) {
                if ( user.id !== id ) {
                    return <button className = 'btn btn-info btn-sm' onClick = { this._addPlayer } data-id = { id }>Show Name</button>;
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
        const users = this.state.users.map( ( user, i ) => {
            const style = { backgroundPosition: user.profPic.x + 'px '  + user.profPic.y + 'px' }
            return (
                <div className = 'col-6 col-sm-3 user-wrap'>
                    <div className = 'user-details-wrap'>
                        <ul className = 'user-list-wrap' key = { i }>
                            <li className = 'user-item user-name-wrap'>
                                <span style = { style }className = 'user-pic d-inline-block align-top'></span>
                                <span ref = {( _user ) => this._username = _user}>{ user.firstName + ' ' + user.lastName }</span>
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
