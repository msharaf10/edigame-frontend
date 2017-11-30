import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../../components/auth/loginForm'

const Login = () => (
    <div className = 'container'>
        <div className = 'ui-f row' style = {{ marginTop: '50px' }}>
            <div className = 'col-lg-6' style = {{ margin: 'auto' }}>
                <h3>EVEREST</h3>
                <h4>Login</h4>
                <LoginForm />
                <p>
                    New here?&nbsp;
                    <Link to = '/signup'>Signup</Link>
                </p>
            </div>
        </div>
    </div>
)

export default Login
