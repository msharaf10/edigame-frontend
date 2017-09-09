import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from '../navbar.jsx';
import SearchTeamBox from './search-team-box.jsx';

const urlParts = window.location.pathname.split( '/' );
const teamName = urlParts[ 2 ];
const admin = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );

class  AdminPage extends React.Component {
    constructor( props ) {
        super( props );

        this._removePlayer = this._removePlayer.bind( this );
    }

    _removePlayer( e ) {
        const id = e.target.closest('.player-wrap').getAttribute( 'data-id' );
        const Confirm = confirm( 'Are you sure to remove this player?');

        if ( !Confirm ) return false;

        this._removePlayerFromTeam( id, admin.team );
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

            alert( 'The player has been removed' );
        }
    }

    _errorHandler( err, message ) {
        if ( err.status >= 400 && err.status < 500 )
            return err.text().then( function( message ) {
                alert( messag );
            });
        if ( message ) return alert( messag );
        alert( message );
        return alert( message );
    }

    render() {
        if ( this.props.players.length || this.props.isValidTeam || this.props.company ) {

            const players = this.props.players.map( ( player, i ) => {
                let leader = player.isLeader ? 'is-leader' : '';

                if ( player._id !== admin.id ) {
                    return (
                        <div className = 'player-wrap' key = { i } data-id = { player._id }>
                            <ul>
                                <li className = { leader }>
                                    <span>{ i + 1 }: { player.firstName + ' ' + player.lastName }</span>
                                    <i className = 'fa fa-window-close' onClick = { this._removePlayer } title = 'Remove Player'></i>
                                    <i className = 'fa fa-check' onClick = { this._makeLeader } title = 'Make Leader'></i>
                                </li>
                            </ul>
                        </div>
                    );
                } else {
                    return '';
                }
            });

            let companyName = this.props.company;
            let title = players.length ? 'All Players' : 'This team has ZERO players';

            return (
                <div className = 'container team-content'>
                    <div className = 'row justify-content-md-center'>
                        <div className = 'col-md-auto'>
                            <h3>Admin Dashboard</h3>
                        </div>
                    </div>
                    <div className = 'row'>
                        <div className = 'col col-sm-4'>
                            <div className = 'team-info'>
                                <h4>Team Name: <span>{ teamName }</span></h4>
                                <h4>Company: <span>{ companyName }</span></h4>
                            </div>
                            <button className = 'btn btn-danger'>Delete Team</button>
                        </div>
                        <div className = 'players-wrap col col-sm-7'>
                            <p>{ title }</p>
                            { players }
                        </div>
                    </div>
                    <div className = 'row'>
                        <div className = 'col col-sm-4'>
                        </div>
                    </div>
                </div>
            );

        } else {
            return <SearchTeamBox />;
        }
    }

}

class TeamMempers extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            players: [],
            company: '',
            isValidTeam: false
        }
    }

    componentWillMount() {
        const that = this;

        // get players of the team
        fetch( '/api/search/team/' + teamName + '/players')
        .then( ( res ) => {
            if ( !res.ok ) return errorHandler( res );
            res.json().then( ( data ) => that.setState({
                players:data[ 0 ],
                company: data[ 1 ]
            }) )
        }).catch( ( err) => alert( err ) );

        function errorHandler( err, message ) {
            if ( err.status >= 400 && err.status < 500 )
                return err.text().then( ( message) => { if ( message == 'no players'){ that.setState({ isValidTeam: true })} } );
            if ( message ) return alert( message );
            return alert( 'There was a problem submitting your form. Please try again later' );
        }
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

    render() {
        if ( this._identifyUser() === 'admin' ) {
            return (
                <div>
                    <Navbar />
                    <div className = 'container'>
                        <AdminPage players = { this.state.players } company = { this.state.company } isValidTeam = { this.state.isValidTeam }/>
                    </div>
                </div>
            );

        } else if ( this._identifyUser() === 'leader' ) {
            return (
                <div>
                    <Navbar />
                    <div className = 'container'>
                        <h1>You are Leader</h1>
                        <h2>leader content goes here</h2>
                    </div>
                </div>
            );

        } else if (  this._identifyUser() ===  'player' ) {
            return (
                <div>
                    <Navbar />
                    <div className = 'container'>
                        <h1>You are player</h1>
                        <h2>player content goes here</h2>
                    </div>
                </div>
            );

        } else {
            return <h1>normal team goes here</h1>;
        }
    }
}

class Main extends React.Component {
    render() {
        return <TeamMempers />;
    }
}

const root = document.getElementById( 'root' );
ReactDOM.render( <Main />, root );
