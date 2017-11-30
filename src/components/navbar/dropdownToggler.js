import React from 'react'

const DropdownToggler = () => (
    <button
        className = 'btn btn-secondary btn-sm dropdown-toggle'
        style = {{ cursor: 'pointer', fontSize: '8px', padding: '6px' }}
        id = 'navbarMenu'
        data-toggle = 'dropdown'
        aria-haspopup = 'true'
        aria-expanded = 'false'>
        <i className = 'fa fa-chevron-down'></i>
    </button>
)

export default DropdownToggler
