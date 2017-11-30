import React from 'react'
import PropTypes from 'prop-types'
import TeamInfo from './teamInfo'
import Member from './member'

const ViewTeamProfile = ({ team, payload, onMakeLeader, onRemoveMember, onTeamReady }) => {
    const { _id, name, author, company, finished, started, isReady, isVerified, members } = team
    const teamHasLeader = members.findIndex( member => member.isLeader ) > -1
    debugger
    return (
        <div className = 'team-profile-holder'>
            <div className = 'container'>
                <h3>
                    <strong>{ name }</strong>
                </h3>
                <div className = 'row'>
                    <TeamInfo
                        name = { name }
                        author = { author }
                        company = { company }
                        started = { started }
                        finished = { finished }
                    />
                    <div className = 'col-md-9'>
                        <h4 className = 'text-center'>Members</h4>
                        <table className = 'team-members-wrap table table-hover'>
                            <thead>
                                <tr>
                                    <th scope = 'col'>#</th>
                                    <th scope = 'col'>Member Name</th>
                                    <th scope = 'col'>Role</th>
                                    {
                                        !started && !isReady && payload._id === author._id ?
                                        <th scope = 'col'>Options</th> : null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    members.map( ( member, index ) => {
                                        return <Member
                                                    key = { member._id }
                                                    member = { member }
                                                    team = { team }
                                                    index = { index + 1 }
                                                    payload = { payload }
                                                    onMakeLeader = { onMakeLeader }
                                                    onRemoveMember = { onRemoveMember }
                                                />
                                    })
                                }
                            </tbody>
                        </table>
                        {
                            !started && members.length === 5 && !teamHasLeader && payload._id === author._id ?
                            <div className = 'alert alert-info'>
                                To get started, You have to choose a member to be the <strong>leader</strong> of this team.
                            </div> : null
                        }
                    </div>
                </div>
                {
                    !started && !isReady && members.length === 5 && teamHasLeader && payload._id === author._id ?
                    <div className = 'team-ready-button'>
                        <button
                            className = 'btn btn-success'
                            onClick = { () => onTeamReady( _id ) }>
                            Ready?
                        </button>
                    </div> : null
                }
            </div>
        </div>
    )
}

ViewTeamProfile.propTypes = {
    team: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
    onMakeLeader: PropTypes.func.isRequired,
    onRemoveMember: PropTypes.func.isRequired,
    onTeamReady: PropTypes.func.isRequired
}
export default ViewTeamProfile
