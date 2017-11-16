import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUserProfile } from '../actions/index'
import NotFound from '../components/notFound'
import UserProfile from '../components/user/userProfile'
import ViewUserProfile from '../components/user/viewUserProfile'

class UserPage extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        msg: PropTypes.string.isRequired,
        payload: PropTypes.object.isRequired,
    }

    componentDidMount() {
        this.fetchProfile( this.props.match.params.q )
    }

    componentWillReceiveProps( nextProps ) {
        const oldParam = this.props.match.params.q
        const newParam = nextProps.match.params.q
        if ( newParam !== oldParam )
            this.fetchProfile( newParam )
    }

    fetchProfile = param => {
        const { dispatch } = this.props
        dispatch( fetchUserProfile( param ) )
    }

    render() {
        const { user, msg, payload } = this.props
        if ( !user._id && !msg )
            return null
        if ( msg )
            return <NotFound msg = { msg } />
        if ( payload.username === user.username )
            return <UserProfile { ...user } />
        return <ViewUserProfile { ...user } role = { payload.role } />
    }
}

const mapStateToProps = ({ profile, user }) => ({
    user: profile.user,
    msg: profile.msg,
    payload: user.payload
})

export default connect( mapStateToProps )( UserPage )
