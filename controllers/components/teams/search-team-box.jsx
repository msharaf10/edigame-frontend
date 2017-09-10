import React from 'react';
import ReactDOM from 'react-dom';

const urlParts = window.location.pathname.split( '/' );
const teamName = urlParts[ 2 ];

export default class TeamNotFound extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            teamName: '',
            errorMessage: '',
            displayError: ''
        }

        this._handleSearch = this._handleSearch.bind( this );
        this._handleChange = this._handleChange.bind( this );
    }

    _handleChange( e ) {
        const target = e.target;
        const value = target.value;

        this.setState({
            teamName: value
        });
    }

    _handleSearch( e ) {
        this.setState({
            displayError: '',
            errorMessage: ''
        });

        const form = document.forms[ 's' ];
        if ( this.state.teamName === '' ) {
            e.preventDefault();
            this.setState({
                displayError: 'alert alert-danger',
                errorMessage: 'STOP! Please insert a team name'
            });
        }
    }

    render() {
        return (
            <div className = 'container search-error-wrap'>
                <div className = 'alert alert-warning search-error-message' role = 'alert'>
                    <i className = 'fa fa-exclamation-triangle' aria-hidden = 'true'></i>
                <span> 404 - <span id = 'url-team'>{ teamName }</span> NOT FOUND!</span>
                </div>
                <div className = 'search-form-wrap'>
                    <div className = { this.state.displayError } role = 'alert'>{ this.state.errorMessage }</div>
                    <form className = 'form-inline my-2 my-lg-0' action = '/search' method = 'GET' role = 'search' onSubmit = { this._handleSearch } name = 's'>
                        <input className = 'form-control mr-sm-2' value = { this.state.teamName } onChange = { this._handleChange } type='text' placeholder = 'Search Team' aria-label = 'Search' name = 'q'/>
                        <input name = 'for' style = {{ display: 'none' }} value = 'team' />
                    <button className = 'btn btn-outline-success' type = 'submit'>Search Team</button>
                    </form>
                </div>
            </div>
        )
    }
}
