import React from 'react';

import AdminTeam from './admin-team.jsx';
import LeaderTeam from './leader-team.jsx';
import PlayerTeam from './player-team.jsx';
import NormalTeamPage from './normal-team.jsx'

export default class Team extends React.Component {

    _identifyUser() {
        if ( localStorage.token ) {
            const user = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );

            if ( user.isAdmin && this.props.teamId === user.team ) {
                return 'admin';
            } else if ( user.isLeader && this.props.teamId === user.team ) {
                return 'leader';
            } else if ( user.team && this.props.teamId === user.team ) {
                return 'player';
            } else {
                return 'user';
            }
        } else {
            return 'user'
        }
    }

    render() {
        if ( this._identifyUser() === 'admin' ) {
            return <AdminTeam />;
        }
        if ( this._identifyUser() === 'leader' ) {
            return <LeaderTeam />;
        }
        if ( this._identifyUser() === 'player' ) {
            return <PlayerTeam />
        }
        if ( this._identifyUser() === 'user' ) {
            return <NormalTeamPage />;
        }
        return <h1>Something went wrong in Team</h1>;
    }
}
