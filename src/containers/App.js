import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Navbar from './Navbar'
import Login from './auth/Login'
import HomePage from './HomePage'
import PopupRegister from './auth/PopupRegister'

import { fetchUser } from '../actions/index'
import { loadToken, loadPayload } from '../helpers/auth'

let token = loadToken()

class App extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props
        if ( token ) {
            let { id } = loadPayload()
            dispatch( fetchUser( id ) )
        }
    }

    render() {
        let path = window.location.pathname

        if ( !token )
            switch ( path ) {
                case '/':
                    return <Login />
                case '/login':
                case '/signup':
                    return null
                default:
                    return <PopupRegister />
            }
        return (
            <div>
                <Navbar />
                { path === '/' ? <HomePage /> : null }
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => ({ user })
export default connect( mapStateToProps )( App )
