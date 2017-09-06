import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from '../navbar.jsx';

class Search extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            isSearch: false,
            result: 'no data'
        };
    }
    componentWillMount() {
        const that = this;
        function getQueriesFromURL( query, url ) {
            if ( !url ) url = window.location.href;

            query = query.replace( /[\[\]]/g, '\\$&' );

            var regex = new RegExp( '[?&]' + query + '(=([^&#]*)|&|#|$)' ),
                results = regex.exec( url );

            if ( !results ) {
                that.setState({
                    isSearch: false
                });
                return null;
            }


            if ( !results[ 2 ] ) return '';
            return decodeURIComponent( results[ 2 ].replace( /\+/g, ' ' ) );
        }

        const _q = getQueriesFromURL( 'q' );
        const _for = getQueriesFromURL( 'for' );

        if ( !_q ) return false;
        fetch('/api/search/' + _for + '?q=' + _q )
        .then( ( res ) => {
            if ( !res.ok ) return errorHandler( res );
            res.json().then( function( res ) {
                if ( _for == 'user' ) {
                    that.setState({
                        result: 'Search for' + res[0].email
                    });
                } else {
                    that.setState({
                        result: 'Search for' + res[ 0 ].teamName
                    })
                }
            })
        }).catch( function( err ) { alert( 'error occurred' ) } );

        function errorHandler(err, message) {
            if (err.status >= 400 && err.status < 500)
                return err.text().then(function(message) { that.setState({ result: message }) });
            if (message) return that.setState({ result: message });
            return displayError('There was a problem submitting your form. Please try again later');
        }

        // TODO get the query from URL
        // TODO fetch localhost:3000/search/
    }

    render() {
        //const content = this.state.isSearch? <Search_Result // TODO pass state of this component to props here /> : <Search_Page />;
        return (
            <div>
                <Navbar />
                <div className = 'container'>
                    <h1>{ this.state.result }</h1>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Search />,
    document.getElementById( 'root' )
)
