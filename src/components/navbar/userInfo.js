import React from 'react'
import PropTypes from 'prop-types'
import { defaultImg } from '../../helpers/helpers'

const UserInfo = ({
    firstName,
    lastName,
    imgURL
}) => (
    <div className = 'mr-auto p-2'>
        <span className = 'avatar'>
            <img
                className = 'img-thumbnail'
                src = { `/img/avatars/${ imgURL || defaultImg }` }
                style = {{ height: '40px', marginRight: '10px' }}
            />
        </span>
        <span className = 'text-capitalize'>
            { `${ firstName } ${ lastName }` }
        </span>
    </div>
)

UserInfo.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    imgURL: PropTypes.string,
}

export default UserInfo
