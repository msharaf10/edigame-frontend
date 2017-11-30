import React, { Component } from 'react'
import { validName } from '../../helpers/helpers'
import { options } from '../../helpers/auth'
import Input from '../auth/input'
import Loading from '../loading'

class CreateTeamForm extends Component {
    constructor() {
        super()

        this.state = {
            teamName: '',
            company: '',
            errorMessage: '',
            isSubmitting: false,
            formHasError: false
        }
    }

    componentDidMount() {
        this.submitButton.disabled = true
    }

    handleChange = e => {
        let { name, value } = e.target
        let { submitButton } = this

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
        let { teamName, company } = state

        let fields = [ 'teamName', 'company' ],
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

        // validate team name
        if ( !validName( teamName ) ) {
            this.setState({
                formHasError: true,
                errorMessage: 'invalid team name, use( "A-Z", "0-9" or "_" ) only'
            })
            Inputs.teamName.style.border = '1px solid #dc1b1b'
            return
        }
        return true
    }

    errorHandler = err => {
        let { submitButton } = this

        this.setState({ isSubmitting: false })
        submitButton.innerText = 'Create New Team'
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
        let { teamName, company } = state
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
            submitButton.innerText = 'Create New Team'
            submitButton.disabled = true
            return
        }

        this.creatNewTeam({ teamName, company })
    }

    creatNewTeam = ( body = { teamName, company } ) => {
        let tryCreateNewTeam = res => {
            if ( res.status === 201 )
                window.location = `/teams/${ body.teamName }`
            else
                this.errorHandler( res )
        }

        fetch( '/api/teams', options( 'POST', body ) )
            .then( tryCreateNewTeam )
            .catch( this.errorHandler )
    }

    render() {
        const { teamName, company, isSubmitting, formHasError, errorMessage } = this.state
        const onChange = ::this.handleChange
        const props = {
            teamName: {
                For: 'teamName',
                focus: 'true',
                value: teamName,
                onChange
            },
            company: {
                For: 'company',
                value: company,
                onChange
            },
            submit: {
                onClick: ::this.handleSubmit,
                ref: node => { this.submitButton = node }
            }
        }

        return (
            <form>
                {
                    formHasError &&
                    <div className = 'alert alert-danger text-capitalize text-center'>
                        { errorMessage }
                    </div>
                }
                <Input { ...props.teamName }>Team Name</Input>
                <Input { ...props.company }>Company</Input>
                <div className = 'form-group'>
                    <button className = 'btn btn-primary' { ...props.submit }>
                        { isSubmitting && <Loading /> }
                        Create New Team
                    </button>
                </div>
            </form>
        )
    }
}

export default CreateTeamForm
