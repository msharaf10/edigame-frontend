import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import DropdownToggler from './dropdownToggler'

const NavigationList = ({
    user,
    onLogoutClick
}) => {
    const { role } = user
    return (
        <div className = 'p-2'>
            <div className = 'dropdown'>
                <DropdownToggler />
                <div className = 'dropdown-menu dropdown-menu-right' aria-labelledby = 'navbarMenu'>
                    <Link to = '/' className = 'dropdown-item'>
                        Home
                    </Link>
                    <Link to = { `/users/${ user.username }` } className = 'dropdown-item'>
                        My Profile
                    </Link>
                    <Link to = '/my-teams' className = 'dropdown-item'>
                        My Teams
                    </Link>
                    <div className = 'dropdown-divider'></div>
                    <Link to = '/users' className = 'dropdown-item'>
                        Users
                    </Link>
                    {
                        role !== 'Admin' ? null :
                        <div>
                            <Link to = '/teams' className = 'dropdown-item'>
                                Teams
                            </Link>
                            <Link to = '/teams/create' className = 'dropdown-item'>
                                Create New Team
                            </Link>
                        </div>
                    }
                    <div className = 'dropdown-divider'></div>
                    <Link to = '/help' className = 'dropdown-item'>
                        Help
                    </Link>
                    <Link to = '/settings' className = 'dropdown-item'>
                        Settings
                    </Link>
                    <div className = 'dropdown-divider'></div>
                    <Link to = '#' onClick = { onLogoutClick } className = 'dropdown-item'>
                        <i className = 'fa fa-sign-out'></i>
                        Logout
                    </Link>
                </div>
            </div>
        </div>
    )
}

NavigationList.propTypes = {
    user: PropTypes.shape({
        role: PropTypes.string,
        username: PropTypes.string
    }).isRequired,
    onLogoutClick: PropTypes.func.isRequired
}
export default NavigationList
