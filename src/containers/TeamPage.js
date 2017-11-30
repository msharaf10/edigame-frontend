import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchTeamProfile, removeUserFromTeam, makeLeader } from '../actions/index'
import NotFound from '../components/notFound'
import ViewTeamProfile from '../components/team/viewTeamProfile'

class TeamPage extends Component {
    static propTypes = {
        team: PropTypes.object.isRequired,
        msg: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
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
        dispatch( fetchTeamProfile( param ) )
    }

    render() {
        const { team, payload, msg, status, match, dispatch } = this.props
        const params = match.params.q
        if ( !payload.role || !msg && status === 0 )
            return null
        if ( status === 404 )
            return <NotFound />
        if ( status === 403 )
            return <p className = 'text-center font-weight-bold'>You have to be a member of this team to view { params }</p>
        return <ViewTeamProfile
                    team = { team }
                    payload = { payload }
                    onMakeLeader = { ( user, team ) => dispatch( makeLeader( user, team )) }
                    onRemoveMember = { ( user, team ) => dispatch( removeUserFromTeam( user, team ) ) }
                    onTeamReady = { id => alert( `teamId: ${ id }` ) }
                />
    }
}

const mapStateToProps = ({ user, teamProfile }) => ({
    team: teamProfile.team,
    status: teamProfile.status,
    msg: teamProfile.msg,
    payload: {
        _id: user.payload._id,
        role: user.payload.role
    }
})

export default connect( mapStateToProps )( TeamPage )
