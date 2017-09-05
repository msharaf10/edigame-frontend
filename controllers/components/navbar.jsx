import React from 'react';

export default class Admin_Navbar extends React.Component {
    constructor( props ){
        super( props );
        this.state = {
            team: ''
        }
        this._handleSearch = this._handleSearch.bind( this );
    }

    componentDidMount() {
        const user = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );
        const team = user.isAdmin ? '/admin/team' : '/my-team'

        this.setState({
            team: team
        });
    }

    _logoutUser( e ) {
        e.preventDefault();
        localStorage.removeItem( 'token' );
        window.location = '/';
    }

    _handleSearch( e ) {
        const form = document.forms[ 's' ];
        const search_for = prompt( 'Search for?\ntype: \'user\' or \'team\'');
        const value = form.q.value;

        if ( !search_for ) {
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
        } else {
            e.preventDefault();
        }
    }

    render() {
        const user = JSON.parse( atob( localStorage.token.split( '.' )[ 1 ] ) );
        let style = { position: 'absolute', left: 'unset' }; // style dropdown menu

        return (
            <div className = 'container-fluid navbar-wrap'>
                <div className = 'container'>
                    <nav className = 'navbar justify-content-between'>
                        <div className = 'navbar-brand'>
                            <img src = { 'img/profile/' + user.profPic + '.png' } width = '30' height = '30' className = 'user-pic d-inline-block align-top' alt = { user.name } />
                            <span className = 'user-name'>{ user.name }</span>
                        </div>
                        <div className = 'my-2 my-lg-0'>
                            <form className = 'form-inline my-2 my-lg-0' action = '/search' method = 'GET' role = 'search' onSubmit = { this._handleSearch } name = 's'>
                                <input className = 'form-control mr-sm-2' type='text' placeholder = 'Search' aria-label = 'Search' name = 'q'/>
                                <input name = 'for' style = {{ display: 'none' }} />
                                <button className = 'btn btn-outline-success btn-sm my-2 my-sm-0' type = 'submit'>Search</button>
                            </form>
                            <ul className = 'navbar-nav'>
                                <li className = 'nav-item dropdown'>
                                    <a href = '#' className = 'nav-link dropdown-toggle' id = 'navbarDropdownMenuLink' data-toggle = 'dropdown' aria-haspopup = 'true' aria-expanded = 'false'>
                                    </a>
                                    <div className = 'dropdown-menu' aria-labelledby = 'navbarDropdownMenuLink' style = { style }>
                                        <a className = 'dropdown-item' href = { this.state.team }>My Team</a>
                                        <a className = 'dropdown-item' href = '/settings'>Settings</a>
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
