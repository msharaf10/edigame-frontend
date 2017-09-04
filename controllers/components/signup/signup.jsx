import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
    render() {
        return <h1>signup</h1>;
    }
}

const root = document.getElementById( 'root' );
ReactDOM.render(
    <Main />,
    root
);
