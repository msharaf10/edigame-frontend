import React from 'react';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom';

// ----------  Components  ---------- //
// All components goes here

const App = ({ store }) => (
    <Provider store = { store }>
        { /* All routes goes here */ }
    </Provider>
);

export default App;
