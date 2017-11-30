import React from 'react'
import { connect } from 'react-redux'
import SettingsForm from '../components/settings/settingsForm'

const SettingsPage = () => (
    <div className = 'container'>
        <div className = 'ui-f row' style = {{ marginTop: '50px' }}>
            <div className = 'col-lg-6' style = {{ margin: 'auto' }}>
                <h4>Settings</h4>
                <SettingsForm />
            </div>
        </div>
    </div>
)

export default SettingsPage
