import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Member = ({ member, index, team, payload, onMakeLeader, onRemoveMember }) => {
    const { _id, firstName, lastName, username, isLeader, role } = member
    return (
        <tr className = { `team-member-item ${ isLeader ? 'alert-primary' : '' }` } title = { isLeader ? 'Team Leader' : '' }>
            <th scope = 'row'>{ index }</th>
            <td className = 'text-capitalize'>
                <Link to = { `/users/${ username }` }>
                    { `${ firstName } ${ lastName }` }
                </Link>
            </td>
            <td>
                {
                    role ? `${ role }` : 'NA'
                }
            </td>
            {
                !team.started && !team.isReady && payload._id === team.author._id ?
                <td>
                    {
                        isLeader ? <span>Leader</span> :
                        <button
                            onClick = { () => onMakeLeader( _id, team._id ) }
                            className = 'member-leader btn btn-sm btn-secondary'>
                            Make Leader
                        </button>
                    }
                    <button
                        title = 'Remove Member'
                        onClick = { () => onRemoveMember( _id, team._id ) }
                        className = 'member-remover btn btn-sm btn-secondary'>
                        <i className = 'fa fa-times'></i>
                    </button>
                </td> : null
            }
        </tr>
    )
}

Member.propTypes = {
    member: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    team: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
    onMakeLeader: PropTypes.func.isRequired,
    onRemoveMember: PropTypes.func.isRequired
}
export default Member
