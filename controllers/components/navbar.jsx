import React from 'react';
import { Link } from 'react-router-dom';
import helpers from './helpers/helpers';

const user = helpers.getToken();

export default class Navbar extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            team: '',
            teamLink: ''
        }
        this._handleSearch = this._handleSearch.bind( this );
    }

    componentWillMount() {
        const that = this;

        // TODO make this fetch function update all navbar details
        fetch( '/users/get-one-user/' + user.id )
        .then( ( res )  => {
            if ( !res.ok ) return alert( 'failed fetching user' );
            res.json().then( ( user ) => {
                that.setState({
                    team: user.team
                });
                if ( that.state.team )
                    that._fetchTeamName( user.team );
            });
        }).catch( ( err ) => alert( err ) );
    }

    // Fetch team name of user
    _fetchTeamName( id ) {
        fetch( '/teams/get-one-team/' + id )
        .then( function( res ) {
            if ( !res.ok ) return alert( 'failed fetching team' );
            res.json().then( function( team ) {
                that.setState({
                    teamLink: team.teamName
                });
            });
        }).catch( function( err ) { alert( err ) } );
    }

    _logoutUser( e ) {
        e.preventDefault();

        localStorage.removeItem( 'token' );
        window.location = '/';
    }

    _handleSearch( e ) {
        const form = document.forms[ 's' ];
        const search_for = prompt( "Search for?\ntype: 'user' or 'team'" );
        const value = form.q.value;

        if ( !search_for || ( search_for !== 'user' && search_for !== 'team' ) ) {
            e.preventDefault();

        } else if ( search_for === 'user' ) {
            form[ 'for' ].value = search_for;

            if ( value === '' ) {
                alert( 'insert a username to search' );
                e.preventDefault();
            }

        } else if ( search_for === 'team' ) {
            form[ 'for' ].value = search_for;

            if ( value === '' ) {
                alert( 'insert a team name to search' );
                e.preventDefault();
            }
        }
    }

    render() {
        const name = user.firstName || user.lastName || user.username;
        const style = {
            dropdown: { position: 'absolute', left: 'unset' },
            profilePosition: { backgroundPosition: user.profPic.x + 'px '  + user.profPic.y + 'px' }
        };

        return (
            <div className = 'container-fluid navbar-wrap'>
                <div className = 'container'>
                    <nav className = 'navbar justify-content-between'>
                        <div className = 'navbar-brand'>
                            <span style = { style.profilePosition }className = 'user-pic d-inline-block align-top'></span>
                            <span className = 'user-name'>{ name }</span>
                        </div>
                        <div className = 'my-2 my-lg-0'>
                            <form className = 'form-inline my-2 my-lg-0' action = '/search' method = 'GET' role = 'search' onSubmit = { this._handleSearch } name = 's'>
                                <input className = 'form-control mr-sm-2' type='text' placeholder = 'Search' aria-label = 'Search' name = 'q'/>
                                <input name = 'for' style = {{ display: 'none' }} />
                                <button className = 'btn btn-outline-success btn-sm my-2 my-sm-0' type = 'submit'>Search</button>
                            </form>
                            <ul className = 'navbar-nav'>
                                <li className = 'nav-item dropdown'>
                                    <a href = '#' className = 'nav-link dropdown-toggle' id = 'navbarDropdownMenuLink' data-toggle = 'dropdown' aria-haspopup = 'true' aria-expanded = 'false'></a>
                                    <div className = 'dropdown-menu' aria-labelledby = 'navbarDropdownMenuLink' style = { style.dropdown }>
                                        <Link className = 'dropdown-item' to = '/teams/my-teams'>My Teams</Link>
                                        <Link className = 'dropdown-item' to = '/players'>All Players</Link>
                                        <Link className = 'dropdown-item' to = '/settings'>Settings</Link>
                                        <a className = 'dropdown-item' href = '#' onClick = { this._logoutUser }>Logout</a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        );
    }
}
