import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchTeamsOfUser } from '../actions/index'
import { loadToken } from '../helpers/auth'
import UserTeams from '../components/user/userTeams'

class TeamsOfUser extends Component {
    static propTypes = {
        teams: PropTypes.array.isRequired
    }

    componentDidMount() {
        const { payload } = loadToken()
        this.fetchTeams( payload.id )
    }

    fetchTeams = id => {
        const { dispatch } = this.props
        dispatch( fetchTeamsOfUser( id ) )
    }

    render() {
        const { teams } = this.props
        if ( !teams.length )
            return (
                <div className = 'container'>
                    <p className = 'text-center'>You have no teams.</p>
                </div>
            )
        return <UserTeams teams = { teams } />
    }
}

const mapStateToProps = ({ user }) => ({
    teams: user.teams
})
export default connect( mapStateToProps )( TeamsOfUser )
