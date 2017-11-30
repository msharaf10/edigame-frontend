import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { defaultImg } from '../../helpers/helpers'

const Controller = ({ role, user, openModal, promotion, demotion }) => {
    if ( role === 'Admin' )
        return <button onClick = { () => openModal( user ) }>Add Member</button>
    if ( role === 'SuperAdmin' ) {
        if ( user.role === 'Admin' )
            return <button onClick = { () => demotion( user._id ) }>Demote User</button>
        return <button onClick = { () => promotion( user._id ) }>Promote User</button>
    }
    return null
}

const User = ({ user, openModal, promotion, demotion, role }) => {
    const { _id, firstName, lastName, username, imgURL } = user
    const img = imgURL || defaultImg
    return (
        <div
            key = { _id }
            className = 'p-2 list-group-item list-group-item-action'>
            {
                user.role !== 'Admin' ? null : <i className = 'fa fa-star u-admin'></i>
            }
            <div className = 'user-card'>
                <img className = 'user-card-img' src = { `/img/avatars/${ img }` } alt = { user.username } />
                <div className = 'user-card-body'>
                    <span className = 'user-card-title text-capitalize'>
                        { `${ firstName } ${ lastName }` }
                    </span>
                    <Link to = { `/users/${ username }` }>
                        @{ username }
                    </Link>
                    {
                        <Controller
                            role = { role }
                            user = { user }
                            openModal = { openModal }
                            promotion = { promotion }
                            demotion = { demotion }
                        />
                    }
                </div>
            </div>
        </div>
    )
}

User.propTypes = {
    user: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    promotion: PropTypes.func.isRequired,
    demotion: PropTypes.func.isRequired,
    role: PropTypes.string
}
export default User
