import React from 'react';
import ReactDOM from 'react-dom';

import Loading from '../loading.jsx';
import Team from './team.jsx';
import TeamNotFound from './team-not-found.jsx';

export default class getTeam extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            loading: true,
            teamStatus: 0,
            teamId: ''
        }
    }

    componentWillMount() {
        const that = this;

        // get team name from URL
        const urlParts = window.location.pathname.split( '/' );
        const teamName = urlParts[ 2 ];

        // fetch for requested team
        setTimeout( function() {
            fetch( '/api/teams/team/' + teamName )
            .then( ( res ) => {
                if ( !res.ok ) return errorHandler( res );
                // get players of the team
                res.json().then( ( data ) => that.setState({
                    loading: false,
                    teamStatus: 200,
                    teamId: data._id
                }) )
            }).catch( ( err ) => alert( err ) );
        }, 1500 );

        function errorHandler( err, message ) {
            if ( err.status >= 400 && err.status < 500 )
                return err.text().then( ( message ) => that.setState({
                    loading: false,
                    teamStatus: 404,
                }));
            if ( message ) return alert( 'message: ' + message ) ;
            return alert( 'There was a problem submitting your form. Please try again later' );
        }
    }

    render() {
        if ( this.state.loading ) {
            return <Loading />;
        }

        if ( this.state.teamStatus === 200 ) {
            return <Team teamId = { this.state.teamId } />;
        }

        if ( this.state.teamStatus === 404 ) {
            return <TeamNotFound />;
        }

        return <h1>Something went wrong in getTeam</h1>;
    }
}
