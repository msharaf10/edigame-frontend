import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from '../navbar.jsx';

class Main extends React.Component {

    constructor( props ) {
        super( props );

        this.state = {
            users: []
        };
    }

    componentDidMount() {
        // TODO fetch all players and make admin add them his team
        // then update players team
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className = 'container'>
                    <h1>fetch for players</h1>
                </div>
            </div>
        );
    }
}

const root = document.getElementById( 'root' );
ReactDOM.render( <Main />, root );
