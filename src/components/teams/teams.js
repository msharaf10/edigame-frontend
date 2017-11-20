import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Teams = ({ teams }) => {
    return (
        <div className = 'd-flex justify-content-start flex-wrap'>
            {
                teams.map( team => {
                    return (
                        <Link
                            key = { team._id }
                            to = { `/teams/${ team.name }` }
                            className = 'p-2 list-group-item list-group-item-action'>
                            { team.name }
                        </Link>
                    )
                })
            }
        </div>
    )
}

Teams.propTypes = {
    teams: PropTypes.array.isRequired
}
export default Teams
