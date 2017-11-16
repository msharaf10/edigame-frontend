import React from 'react'
import PropTypes from 'prop-types'

const NotFound = ({ msg }) => (
    <div className = 'not-found-wrap'>
        <p className = 'text-capitalize'>{ msg }</p>
        <form>
            <input className = 'form-control' placeholder = 'search' />
        </form>
    </div>
)

NotFound.propTypes = {
    msg: PropTypes.string.isRequired
}
export default NotFound
