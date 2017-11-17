import React, { Component } from 'react'
import Input from '../auth/input'
import { loadToken, options } from '../../helpers/auth'

class SettingsForm extends Component {
    constructor() {
        super()
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            imgURL: ''
        }
    }

    handleChange = e => {
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }
    /*

        // TODO: validate data

    */

    handleSubmit = e => {
        e.preventDefault()

        const { firstName, lastName, username, imgURL } = this.state
        const { payload } = loadToken()

        const data = {
            firstName,
            lastName,
            username,
            imgURL
        }

        fetch( `/api/users/${ payload.id }`, options( 'PUT', data ) )
            .then( res => {
                if ( res.status === 200 )
                    return location.reload()
                res.json().then( body => alert( body.error ) )
            })
            .catch( err => console.error( err ) )
    }

    render() {
        const { firstName, lastName, username, imgURL } = this.state
        const onChange = ::this.handleChange
        const props = {
            firstName: {
                For: 'firstName',
                focus: 'true',
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
            imgURL: {
                For: 'imgURL',
                value: imgURL,
                onChange
            },
            submit: {
                onClick: ::this.handleSubmit,
                ref: node => { this.submitButton = node }
            }
        }

        return (
            <form>
                <Input { ...props.firstName }>First Name</Input>
                <Input { ...props.lastName }>Last Name</Input>
                <div className = 'form-group'>
                    <label htmlFor = 'username'>Username</label>
                    <div className = 'input-group'>
                        <span className = 'input-group-addon' id = 'basic-addon1'>@</span>
                        <input { ...props.username } />
                    </div>
                </div>
                <Input { ...props.imgURL }>Image URL</Input>
                <div className = 'form-group'>
                    <button className = 'btn btn-primary' { ...props.submit }>
                        Save Changes
                    </button>
                </div>
            </form>
        )
    }
}

export default SettingsForm
