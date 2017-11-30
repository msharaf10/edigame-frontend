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
                <div className = 'container user-teams-holder'>
                    <h4>My Teams List</h4>
                    <ul className = 'list-group'>
                        <li className = 'list-group-item teams-list-header active'>
                            <span className = 'team-name'>Team Name</span>
                            <span className = 'team-company'>Company</span>
                        </li>
                        <li className = 'list-group-item text-center'>You have no teams.</li>
                    </ul>
                </div>
            )
        return <UserTeams teams = { teams } />
    }
}

const mapStateToProps = ({ user }) => ({
    teams: user.teams
})
export default connect( mapStateToProps )( TeamsOfUser )
