import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Root from './containers/Root'
import configureStore from './store/configureStore'

const store = configureStore()
if ( process.env.NODE_ENV !== 'production' ) {
    window.store = store
}

render(
    <Router>
        <Root store = { store } />
    </Router>,
    document.getElementById( 'root' )
)
