import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Loading from '../loading'

const LoginFooter = ({
    btn,
    onClick,
    children,
    isSubmitting
}) => (
    <div>
        <div className = 'form-group'>
            <label className = 'custom-control custom-checkbox'>
                <input type="checkbox" className = 'custom-control-input' />
                <span className = 'custom-control-indicator'></span>
                <span className = 'custom-control-description'>Remember me</span>
            </label>
            <Link
                to = '/forgot-password'
                style = {{ float: 'right', fontSize: '12px' }}>
                Forgot password?
            </Link>
        </div>
        <div className = 'form-group'>
            <button
                ref = { btn }
                onClick = { onClick }
                type = 'submit'
                className = 'btn btn-primary'>
                { isSubmitting && <Loading /> }
                Login
            </button>
        </div>
    </div>
)

LoginFooter.propTypes = {
    btn: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
}

export default LoginFooter
