import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { defaultImg } from '../../helpers/helpers'
import getFilteredUsers from './getFilteredUsers'

const ViewUsers = ({ users }) => (
    <div className = 'd-flex justify-content-start flex-wrap'>
        {
            users.map( user => {
                const img = user.imgURL || defaultImg
                if ( user.role === 'Admin' )
                    return
                return (
                    <div
                        key = { user._id }
                        className = 'p-2 list-group-item list-group-item-action'>
                        {
                            user.role !== 'Admin' ? null : <i className = 'fa fa-star u-admin'></i>
                        }
                        <div className = 'user-card'>
                            <img className = 'user-card-img' src = { `/img/avatars/${ img }` } alt = { user.username } />
                            <div className = 'user-card-body'>
                                <span className = 'user-card-title text-capitalize'>
                                    { `${ user.firstName } ${ user.lastName }` }
                                </span>
                                <Link to = { `/users/${ user.username }` }>
                                    @{ user.username }
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
)

ViewUsers.propTypes = {
    users: PropTypes.array.isRequired
}

const mapStateToProps = ({ users, user, filter }) => ({
    users: getFilteredUsers( users, filter.user )
})

export default connect( mapStateToProps )( ViewUsers )
