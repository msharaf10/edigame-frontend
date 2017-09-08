import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from '../navbar.jsx';

// TODO use _identifyUser to render different classes

class TeamMempers extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            players: []
        }
    }

    componentDidMount() {
        const that = this;

        const urlParts = window.location.pathname.split( '/' );
        const teamName = urlParts[ 2 ];

        // get players of the team
        fetch( '/api/search/team/' + teamName + '/players')
        .then( ( res ) => {
            if ( !res.ok ) return errorHandler( res );
            res.json().then( ( players ) => that.setState({ players }) )
        }).catch( ( err) => alert( err ) );

        function errorHandler( err, message ) {
            if ( err.status >= 400 && err.status < 500)
                return err.text().then( ( message) => alert ( message ) );
            if ( message ) return alert( message );
            return alert( 'There was a problem submitting your form. Please try again later' );
        }
    }

    _getPlayers() {

        const currentPlayers = this.state.players;
        const players = currentPlayers.map( ( player, i ) => {
            if ( !player.isAdmin ) {
                return (
                    <ul className = 'players-list'>
                        <li className = 'user-item' key = { i }>
                            <span>{ player.username }</span>
                            <button className = 'btn btn-danger btn-sm'>Remove player</button>
                        </li>
                    </ul>
                );
            } else {
                return '';
            }
        });

        const admin = currentPlayers.map( ( player, i ) => {
            if ( player.isAdmin ) {
                return (
                    <div className = 'admin-wrap'>
                        <h3>Admin: { player.firstName + ' ' + player.lastName }</h3>
                        <h4>Company { player.companyName }</h4>
                    </div>
                );
            } else {
                return '';
            }
        });



        return (
            <div className = 'players-list'>
                { admin }
                { players }
            </div>
        )
    }

    render() {
        return (
            <div>
                { this._getPlayers() }
            </div>
        );
    }
}

class Main extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            team: [],
            players: []
        };

    }

    _identifyUser() {
        if ( localStorage.token ) {
            const user = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );

            if ( user.isAdmin ) {
                return 'admin';
            } else if ( user.isLeader ) {
                return 'leader';
            } else if ( user.team ) {
                return 'player';
            }
        } else {
            return 'user'
        }
    }

    _main() {
        if ( this._identifyUser() === 'admin' ) {
            return (
                <div>
                    <Navbar />
                    <div className = 'container'>
                        <TeamMempers />
                    </div>
                </div>
            );
        } else if ( this._identifyUser() === 'player' ||  this._identifyUser() ===  'leader' ) {
            return (
                <div>
                    <Navbar />
                    <div className = 'container'>
                        <h1>You are player</h1>
                        <h2>content goes here</h2>
                    </div>
                </div>
            );
        } else {
            return <h1>normal team page!</h1>
        }
    }

    render() {
        // TODO get team name from ulr and compare it with user.teamName
        return (this._main());
    }
}

const root = document.getElementById( 'root' );
ReactDOM.render( <Main />, root );
