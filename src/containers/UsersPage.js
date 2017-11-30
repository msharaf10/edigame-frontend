import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUsers, filterUser, promoteUser, demoteUser, removeFilter } from '../actions/index'
import ViewUsers from '../components/users/viewUsers'
import Users from '../components/users/users'

class UserPage extends Component {
    static propTypes = {
        _id: PropTypes.string.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props
        this.FetchUsers( dispatch )
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch( removeFilter() )
    }

    FetchUsers = dispatch => {
        dispatch( fetchUsers() )
    }

    render() {
        const { dispatch, _id } = this.props
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
                            className = 'form-control'
                            onChange = {
                                e => dispatch( filterUser( e.target.value ) )
                            }
                            placeholder = 'Search...'
                        />
                    </div>
                </div>
                {
                    !_id ? <ViewUsers /> : <Users />
                }
            </div>
        )
    }
}

const mapStateToProps = ({ user }) => ({
    _id: user.payload._id
})

export default connect( mapStateToProps )( UserPage )
