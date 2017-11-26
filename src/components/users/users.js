
// TODO: move this file to container directory

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchSentTeamRequests, fetchTeamsOfUser, sendTeamRequest, promoteUser, demoteUser } from '../../actions/index'
import { loadToken } from '../../helpers/auth'
import getFilteredUsers from './getFilteredUsers'
import AddMemberModal from './addMemberModal'
import User from './user'

class Users extends Component {
    static propTypes = {
        teams: PropTypes.array.isRequired,
        role: PropTypes.string
    }

    // TODO: use redux to hold member's state instead
    constructor() {
        super()
        this.state = {
            add: false,
            member: {}
        }
    }

    componentDidMount() {
        const { role, dispatch } = this.props
        const { payload } = loadToken()
        if ( payload && role === 'Admin' ) {
            this.FetchSentTeamRequests( dispatch )
            this.FetchTeamsOfUser( payload.id, dispatch )
        }
    }

    FetchTeamsOfUser = ( id, dispatch ) => {
        dispatch( fetchTeamsOfUser( id ) )
    }

    FetchSentTeamRequests = dispatch => {
        dispatch( fetchSentTeamRequests() )
    }

    render() {
        const { users, dispatch, role, teams } = this.props
        return (
            <div className = 'd-flex justify-content-start flex-wrap'>
                {
                    !this.state.add ? null :
                    <AddMemberModal
                        teams = { teams }
                        member = { this.state.member }
                        closeModal = { () => this.setState({ add: false, member: {} }) }
                        sendTeamRequest = { ( user, team ) => dispatch( sendTeamRequest( user, team ) ) }
                    />
                }
                {
                    users.map( user => {
                        if ( user.role === 'Admin' && role !== 'SuperAdmin' )
                            return
                        return <User
                                    role = { role }
                                    user = { user }
                                    key = { user._id }
                                    openModal = { member => this.setState({ add: true, member }) }
                                    promotion = { id => dispatch( promoteUser( id ) ) }
                                    demotion = { id => dispatch( demoteUser( id ) ) }
                                />
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = ({ users, user, filter }) => ({
    users: getFilteredUsers( users, filter.user ),
    role: user.payload.role,
    teams: user.teams
})

export default connect( mapStateToProps )( Users )
