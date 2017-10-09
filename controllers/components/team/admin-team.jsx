import React from 'react';

export default class AdminTeam extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            teamId: '',
            players: [],
            companyName: ''
        }

        this._removePlayer = this._removePlayer.bind( this );
        this._makeLeader = this._makeLeader.bind( this );
    }

    componentWillMount() {
        const that = this;

        // get team name from URL
        const urlParts = window.location.pathname.split( '/' );
        const teamName = urlParts[ 2 ];

        // fetch for requested team
        fetch( '/api/search/team/' + teamName + '/players')
        .then( ( res ) => {
            if ( !res.ok ) return errorHandler( res );
            // get players of the team
            res.json().then( ( data ) => that.setState({
                teamId: data[ 2 ],
                teamName: teamName,
                players:data[ 0 ],
                company: data[ 1 ]
            }) )
        }).catch( ( err ) => alert( err ) );

        function errorHandler( err, message ) {
            if ( err.status >= 400 && err.status < 500 )
            return err.text().then( ( message ) => alert( message ));
            if ( message ) return alert( 'message: ' + message ) ;
            return alert( 'There was a problem submitting your form. Please try again later' );
        }
    }
    
    _removePlayer( e ) {
        const admin = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );
        const id = e.target.closest('li').getAttribute( 'data-id' );
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

    _makeLeader( e ) {}

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
        const admin = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );

        const players = this.state.players.map( ( player, i ) => {
            let leader = player.isLeader ? 'is-leader' : '';

            if ( player._id !== admin.id ) {
                return (
                    <li className = { leader } key = { i } data-id = { player._id }>
                        <span>{ i + 1 }: { player.firstName + ' ' + player.lastName }</span>
                        <i className = 'fa fa-window-close' onClick = { this._removePlayer } title = 'Remove Player'></i>
                        <i className = 'fa fa-check' onClick = { this._makeLeader } title = 'Make Leader'></i>
                    </li>
                );
            } else {
                return '';
            }
        });

        let companyName = this.state.company;
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
                            <h4>Team Name: <span>{ this.state.teamName }</span></h4>
                            <h4>Company: <span>{ companyName }</span></h4>
                        </div>
                        <button className = 'btn btn-danger'>Delete Team</button>
                    </div>
                    <div className = 'players-wrap col col-sm-7'>
                        <p>{ title }</p>
                        <div className = 'players-list'>
                            <ul>
                                { players }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className = 'row'>
                    <div className = 'col col-sm-4'>
                    </div>
                </div>
            </div>
        );
    }
}
