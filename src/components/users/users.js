import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { defaultImg } from '../../helpers/helpers'

const Users = ({ users, role }) => {
    return (
        <div className = 'd-flex justify-content-start flex-wrap'>
            {
                users.map( user => {
                    let img = user.imgURL || defaultImg
                    if ( user.role === 'Admin' )
                        return
                    return (
                        <div
                            key = { user._id }
                            className = 'p-2 list-group-item list-group-item-action'>
                            <div className = 'user-card'>
                                <img className = 'user-card-img' src = { `/img/avatars/${ img }` } alt = { user.username } />
                                <div className = 'user-card-body'>
                                    <span className = 'user-card-title text-capitalize'>
                                        { `${ user.firstName } ${ user.lastName }` }
                                    </span>
                                    <Link to = { `/users/${ user.username }` }>
                                        @{ user.username }
                                    </Link>
                                    {
                                        role !== 'Admin' ? null :
                                        <button>
                                            Add Member
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

Users.propTypes = {
    users: PropTypes.array.isRequired,
    role: PropTypes.string
}
export default Users
