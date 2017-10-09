import React from 'react';
import { Link } from 'react-router-dom';
import helpers from '../helpers/helpers';

export default class userTeams extends React.Component {
    constructor( props ) {
        super( props );
    }

    render() {
        return (
            <div className = 'container'>
                <h1>My teams</h1>
                <ul>
                    <li>team</li>
                    <li>team</li>
                    <li>team</li>
                    <li>team</li>
                </ul>
            </div>
        )
    }
}
