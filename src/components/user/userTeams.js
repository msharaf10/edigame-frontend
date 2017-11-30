import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const UserTeams = ({ teams }) => (
    <div className = 'container user-teams-holder'>
        <h4>My Teams List</h4>
        <ul className = 'list-group'>
            <li className = 'list-group-item teams-list-header active'>
                <span className = 'team-name'>Team Name</span>
                <span className = 'team-company'>Company</span>
            </li>
            {
                teams.map( team => {
                    return (
                        <li key = { team._id } className = 'list-group-item list-group-item-action'>
                            <Link to = { `/teams/${ team.name }` }>
                                { team.name }
                            </Link>
                            <span className = 'item-team-company'>
                                { team.company }
                            </span>
                        </li>
                    )
                })
            }
        </ul>
    </div>
)

UserTeams.propTypes = {
    teams: PropTypes.array.isRequired
}
export default UserTeams
