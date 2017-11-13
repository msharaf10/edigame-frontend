import React from 'react'
import { Link } from 'react-router-dom'
import SignupForm from '../../components/auth/signupForm'

const Signup = () => (
    <div className = 'container'>
        <div className = 'ui-f row' style = {{ marginTop: '50px' }}>
            <div className = 'col-lg-6' style = {{ margin: 'auto' }}>
                <h3>EVEREST</h3>
                <h4>Sign Up</h4>
                <SignupForm />
                <p>
                    Already have account?&nbsp;
                    <Link to = '/login'>Login</Link>
                </p>
            </div>
        </div>
    </div>
)

export default Signup
