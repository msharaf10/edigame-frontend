import React from 'react'
import PropTypes from 'prop-types'

const Input = ({
    For,
    value,
    focus,
    onChange,
    children,
}) => (
    <div className = 'form-group'>
        <label htmlFor = { For }>{ children }</label>
        <input
            id = { For }
            name = { For }
            type = { For }
            value = { value }
            autoFocus = { focus }
            onChange = { onChange }
            placeholder = { children }
            className = 'form-control'
            required />
    </div>
)

Input.propTypes = {
    focus: PropTypes.string,
    For: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
}

export default Input
