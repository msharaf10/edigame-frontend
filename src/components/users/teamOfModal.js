import React from 'react'
import PropTypes from 'prop-types'

const TeamOfModal = ({ team, member, index, sendTeamRequest }) => {
    const isMember = team.members.findIndex( m => m.id === member._id ) > -1
    return (
        <tr>
            <th scope = 'row'>{ index }</th>
            <td>{ team.name }</td>
            <td>{ team.company }</td>
            <td>{ `${ team.members.length }/5` }</td>
            <td>
                {
                    isMember ? <span>Is Member</span> :
                    <button onClick = { () => sendTeamRequest( member._id, team._id ) }>Send Request</button>
                }
            </td>
        </tr>
    )
}

TeamOfModal.propTypes = {
    team: PropTypes.object.isRequired,
    member: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    sendTeamRequest: PropTypes.func.isRequired
}

export default TeamOfModal
