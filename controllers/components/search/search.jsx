import React from 'react';

// TODO add loading while searching
// TODO complete the Search component
export default class Search extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            isSearch: false,
            result: 'no data'
        };
    }

    componentWillMount() {
        const that = this;

        const _q = this._getQueriesFromURL( 'q' );
        const _for = this._getQueriesFromURL( 'for' );

        if ( !_q ) return false;
        if ( !_for ) return false;

        fetch('/api/search/' + _for + '?q=' + _q )
        .then( ( res ) => {
            if ( !res.ok ) return that._errorHandler( res );
            res.json().then( ( res ) => {
                if ( _for == 'user' ) {
                    that.setState({
                        result: 'Search for' + res.email
                    });
                } else {
                    that.setState({
                        result: 'Search for' + res.teamName
                    })
                }
            })
        }).catch( ( err ) => alert( 'error occurred ' + err ) );

        // TODO get the query from URL
        // TODO fetch localhost:3000/search/
    }

    _errorHandler( err, message ) {
        if ( err.status >= 400 && err.status < 500 )
            return err.text().then( ( message ) => {
                this.setState({ result: message });
            });
        if ( message ) return this.setState({ result: message });
        return alert( 'There was a problem while searching. Please try again later' );
    }

    _getQueriesFromURL( query, url ) {
        if ( !url ) url = window.location.href;

        query = query.replace( /[\[\]]/g, '\\$&' );

        var regex = new RegExp( '[?&]' + query + '(=([^&#]*)|&|#|$)' ),
            results = regex.exec( url );

        if ( !results ) {
            this.setState({
                isSearch: false
            });
            return null;
        }


        if ( !results[ 2 ] ) return '';
        return decodeURIComponent( results[ 2 ].replace( /\+/g, ' ' ) );
    }

    render() {
        //const content = this.state.isSearch? <Search_Result // TODO pass state of this component to props here /> : <Search_Page />;
        return (
            <div>
                <div className = 'container'>
                    <h1>{ this.state.result }</h1>
                </div>
            </div>
        );
    }
}
