import React from 'react'
import CreateTeamForm from '../components/teams/createTeamForm'

const CreateTeamPage = () => (
    <div className = 'container'>
        <div className = 'ui-f row' style = {{ marginTop: '50px' }}>
            <div className = 'col-lg-6' style = {{ margin: 'auto' }}>
                <h3>EVEREST</h3>
                <h4>Create New Team</h4>
                <CreateTeamForm />
            </div>
        </div>
    </div>
)

export default CreateTeamPage
