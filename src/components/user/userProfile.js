import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { defaultImg } from '../../helpers/helpers'

const UserProfile = ({
    firstName,
    lastName,
    username,
    imgURL
}) => {
    const img = imgURL || defaultImg
    return (
        <div className = 'text-center profile-holder container'>
            <Link className = 'btn btn-info btn-sm option-profile' to = '/settings'>
                Edit Profile
            </Link>
            <div className = 'avatar-wrap'>
                <img className = 'img-thumbnail' src = { `/img/avatars/${ img }` } />
                <p className = 'profile-fullname text-capitalize'>{ `${ firstName } ${ lastName }` }</p>
            </div>
            <p className = 'profile-username'>{ `@${ username }` }</p>
        </div>
    )
}

UserProfile.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    imgURL: PropTypes.string
}
export default UserProfile
