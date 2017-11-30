import React, { Component } from 'react'
import Input from './input'
import LoginFooter from './loginFooter'
import { vaildEmail } from '../../helpers/helpers'
import { saveToken, options } from '../../helpers/auth'

class LoginForm extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            errorMessage: '',
            isSubmitting: false,
            formHasError: false
        }
    }

    componentDidMount() {
        this.submitButton.disabled = true
    }

    handleChange = e => {
        let { name, value } = e.target,
            { submitButton } = this

        this.setState({
            [ name ]: value
        })

        let Inputs = document.getElementsByClassName( 'form-control' ),
            l = Inputs.length,
            i

        for ( i = 0; i < l; i++ ) {
            if ( !Inputs[ i ].value ) {
                submitButton.disabled = true
                break
            }
            submitButton.disabled = false
            Inputs[ i ].style.border = ''
        }
    }

    validForm = Inputs => {
        let { state } = this
        let { email, password } = state

        let fields = [ 'email', 'password' ],
            emptyField = false

        fields.forEach( field => {
            if ( emptyField ) return

            if ( !state[ field ].length ) {
                Inputs[ field ].style.border = '1px solid #dc1b1b'
                emptyField = `missing ${ Inputs[ field ].placeholder }`
            }
        })

        if ( emptyField ) {
            this.setState({
                formHasError: true,
                errorMessage: emptyField
            })
            return
        }

        // validate email
        if ( !vaildEmail( this.state.email ) ) {
            this.setState({
                formHasError: true,
                errorMessage: 'wrong email'
            })
            Inputs.email.style.border = '1px solid #dc1b1b'
            return
        }
        return true
    }

    errorHandler = err => {
        let { submitButton } = this

        this.setState({ isSubmitting: false })
        submitButton.innerText = 'Login'
        submitButton.disabled  = false

        if ( err.status >= 400 && err.status < 500 )
            return err.json().then( e =>
                this.setState({
                    errorMessage: e.error,
                    formHasError: true
                })
            )
        return this.setState({
            errorMessage: `
                Sorry there's a problem with connection,
                please try again later`,
            formHasError: true
        })
    }

    handleSubmit = e => {
        e.preventDefault()

        let { state, submitButton, validForm } = this
        let Inputs = document.getElementsByClassName( 'form-control' )

        submitButton.innerText = 'Loading...'
        submitButton.disabled = true

        this.setState({
            errorMessage: '',
            isSubmitting: true,
            formHasError: false
        })

        if ( !validForm( Inputs ) ) {
            this.setState({ isSubmitting: false })
            submitButton.innerText = 'Login'
            submitButton.disabled = true
            return
        }

        this.loginUser( state )
    }

    tryLogin = res => {
        if ( res.status === 200 )
            res.json().then( ({ token }) => saveToken( token ) )
        else
            this.errorHandler( res )
    }

    loginUser = ( body = { email, password } ) => {

        fetch( '/api/auth/login', options( 'POST', body ) )
            .then( this.tryLogin )
            .catch( this.errorHandler )
    }

    render() {
        const { email, password, isSubmitting, formHasError, errorMessage } = this.state
        const onChange = ::this.handleChange
        const props = {
            email: {
                For: 'email',
                focus: 'true',
                value: email,
                onChange
            },
            password: {
                For: 'password',
                value: password,
                onChange
            },
            submit: {
                onClick: ::this.handleSubmit,
                btn: node => { this.submitButton = node },
                isSubmitting
            }
        }

        return (
            <form>
                { formHasError &&
                    <div className = 'alert alert-danger text-capitalize text-center'>
                        { errorMessage }
                    </div>
                }
                <Input { ...props.email }>Email</Input>
                <Input { ...props.password }>Password</Input>
                <LoginFooter { ...props.submit } />
            </form>
        )
    }
}

export default LoginForm
