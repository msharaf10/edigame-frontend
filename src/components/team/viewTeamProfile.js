import React from 'react'
import PropTypes from 'prop-types'
import TeamInfo from './teamInfo'
import Member from './member'

const ViewTeamProfile = ({ team, payload, onMakeLeader, onRemoveMember, onTeamReady }) => {
    const { _id, name, author, company, finished, started, isVerified, members } = team
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
                                    <th scope = 'col'>Username</th>
                                    {
                                        !started && payload._id !== author._id ? null :
                                        <th scope = 'col'>Options</th>
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
                    </div>
                </div>
                {
                    !started && payload._id === author._id && members.length !== 5 ? null :
                    <div className = 'team-ready-button'>
                        <button
                            className = 'btn btn-success'
                            onClick = { () => onTeamReady( _id ) }>
                            Ready?
                        </button>
                    </div>
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
