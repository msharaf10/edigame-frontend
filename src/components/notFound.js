import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => (
    <div className = 'not-found-wrap'>
        <p className = 'text-capitalize'>Page not found</p>
        <Link to = '/'>Go to Homepage</Link>
    </div>
)

export default NotFound
