import React, { Component } from 'react'
import Input from './input'
import { vaildEmail, validName } from '../../helpers/helpers'
import { saveToken, options } from '../../helpers/auth'
import Loading from '../../components/loading'

class SignupForm extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: '',
            lastName: '',
            username: '',
            firstName: '',
            errorMessage: '',
            formHasError: false,
            isSubmitting: false
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
        let { firstName, lastName, username, email, password } = state

        let fields = [
            'firstName',
            'lastName',
            'username',
            'email',
            'password',
        ],
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

        // validate username
        if ( !validName( username ) ) {
            this.setState({
                formHasError: true,
                errorMessage: `use characters, numbers or underscore,
                    with length between 6 : 15 for valid usename`
            })
            Inputs.username.style.border = '1px solid #dc1b1b'
            return
        }

        // validate email
        if ( !vaildEmail( email ) ) {
            this.setState({
                formHasError: true,
                errorMessage: 'wrong email'
            })
            Inputs.email.style.border = '1px solid #dc1b1b'
            return
        }

        if ( password.length < 6 ) {
            this.setState({
                formHasError: true,
                errorMessage: 'week password'
            })
            Inputs.password.style.border = '1px solid #dc1b1b'
            return
        }
        return true
    }

    errorHandler = err => {
        let { submitButton } = this

        this.setState({ isSubmitting: false })
        submitButton.innerText = 'Signup'
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
        let { firstName, lastName, username } = state
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
            submitButton.innerText = 'Signup'
            submitButton.disabled = true
            return
        }

        if ( firstName === lastName ) {
            let proceed =  confirm( `It seems your 'Firstname' and 'Lastname' are identical!\nWant to proceed?` )
            if ( !proceed ) {
                this.setState({ isSubmitting: false })
                submitButton.innerText = 'Signup'
                submitButton.disabled = false
                return
            }
        }

        let proceed = confirm( `Your username will be '@${ username.toLowerCase() }'\nWant to proceed?` )
        if ( !proceed ) {
            this.setState({ isSubmitting: false })
            submitButton.innerText = 'Signup'
            submitButton.disabled = false
            return
        }
        this.signupUser( state )
    }

    trySignup = res => {
        if ( res.status === 200 )
            res.json().then( ({ token }) => saveToken( token ) )
        else
            this.errorHandler( res )
    }

    signupUser = ( body = { firstName, lastName, username, email, password } ) => {

        fetch( '/api/auth/signup', options( 'POST', body ) )
            .then( this.trySignup )
            .catch( this.errorHandler )
    }

    render() {
        let onChange = ::this.handleChange
        let {
            firstName, lastName, username,
            email, password, isSubmitting,
            formHasError, errorMessage
        } = this.state

        let props = {
            firstName: {
                focus: 'true',
                For: 'firstName',
                value: firstName,
                onChange
            },
            lastName: {
                For: 'lastName',
                value: lastName,
                onChange
            },
            username: {
                id: 'username',
                name: 'username',
                placeholder: 'Username',
                value: username,
                className: 'form-control',
                required: 'required',
                onChange
            },
            email: {
                For: 'email',
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
                ref: node => { this.submitButton = node }
            }
        }

        return (
            <form>
                { formHasError &&
                    <div className = 'alert alert-danger text-capitalize text-center'>
                        { errorMessage }
                    </div>
                }
                <Input { ...props.firstName }>First Name</Input>
                <Input { ...props.lastName }>Last Name</Input>
                <div className = 'form-group'>
                    <label htmlFor = 'username'>Username</label>
                    <div className = 'input-group'>
                        <span className = 'input-group-addon' id = 'basic-addon1'>@</span>
                        <input { ...props.username } />
                    </div>
                </div>
                <Input { ...props.email }>Email</Input>
                <Input { ...props.password }>Password</Input>
                <div className = 'form-group'>
                    <button className = 'btn btn-primary' { ...props.submit }>
                        { isSubmitting && <Loading /> }
                        Signup
                    </button>
                </div>
            </form>
        )
    }
}

export default SignupForm
