import React from 'react'
import { Link } from 'react-router-dom'

const PopupRegister = () => (
    <div className = 'popup-rgs'>
        <div className = 'container'>
            <Link to = '/login' className = 'btn btn-primary'>Login</Link>
            <Link to = '/signup' className = 'btn btn-success'>Signup</Link>
        </div>
    </div>
)

export default PopupRegister
