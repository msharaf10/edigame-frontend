import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const HomePage = state => {
    const user = state.user.payload
    const { firstName, lastName } = user
    if ( !user._id )
        return <div className = 'homepage-holder'></div>
    return (
        <div className = 'homepage-holder'>
            { /* homepage content goes here */ }
            <h3>
                Welcome,
                <span className = 'text-capitalize'>
                    { ` ${ firstName } ${ lastName }` }
                </span>
            </h3>
        </div>
    )
}

HomePage.propTypes = {
    user: PropTypes.object.isRequired
}

const mapStateToProps = ({ user }) => ({ user })
export default connect( mapStateToProps )( HomePage )
