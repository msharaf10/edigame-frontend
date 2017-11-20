import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUsers, filterUser } from '../actions/index'
import Users from '../components/users/users'

const getFilteredUsers = ( users, query ) => {
    return users.filter( user => {
        let fullName = `${ user.firstName } ${ user.lastName }`
        return (
            user.firstName.toLowerCase().indexOf( query.toLowerCase() ) > -1 || // match first name
            user.lastName.toLowerCase().indexOf( query.toLowerCase() ) > -1 ||  // match last name
            user.username.toLowerCase().indexOf( query.toLowerCase() ) > -1 ||  // match username
            fullName.toLowerCase().indexOf( query.toLowerCase() ) > -1          // match fullname
            )
    })
}

class UserPage extends Component {
    static propTypes = {
        users: PropTypes.array.isRequired,
        filter: PropTypes.string.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props
        this.FetchUsers( dispatch )
    }

    FetchUsers = dispatch => {
        dispatch( fetchUsers() )
    }

    render() {
        const { dispatch, users, filter, role } = this.props
        return (
            <div className = 'users-holder'>
                <h3 className = 'text-center'>Users</h3>
                <div className = 'finder-wrap'>
                    <label htmlFor = 'user-finder'>Find user:</label>
                    <div className = 'input-group'>
                        <span className = 'input-group-addon'>
                            <i className = 'fa fa-search'></i>
                        </span>
                        <input
                            autoFocus
                            id = 'user-finder'
                            value = { filter }
                            className = 'form-control'
                            onChange = {
                                e => dispatch( filterUser( e.target.value ) )
                            }
                            placeholder = 'Search...'
                        />
                    </div>
                </div>
                <Users
                    role = { role }
                    users = { users }
                />
            </div>
        )
    }
}

const mapStateToProps = ({ users, filter, user }) => ({
    users: getFilteredUsers( users, filter.user ),
    filter: filter.user,
    role: user.payload.role
})

export default connect( mapStateToProps )( UserPage )
