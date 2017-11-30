import React from 'react'
import PropTypes from 'prop-types'

const TeamInfo = ({ name, author, company, started, finished }) => (
    <div className = 'col-md-3'>
        <h4>Team Info</h4>
        <div className = 'main-info'>
            <span className = 'text-capitalize'>
                Name:&nbsp;
                <strong>{ name }</strong>
            </span>
            <span className = 'text-capitalize'>
                Admin:&nbsp;
                <strong>{ `${ author.firstName } ${ author.lastName }` }</strong>
            </span>
            <span className = 'text-capitalize'>
                Company:&nbsp;
                <strong>{ company }</strong>
            </span>
        </div>
        <div className = 'basic-info'>
            <span>
                Started:&nbsp;
                <i style = {{ color: started ? '#28a745' : '#dc3545' }} className = 'fa fa-circle'></i>
            </span>
            <span>
                Finished:&nbsp;
                <i style = {{ color: finished ? '#28a745' : '#dc3545' }} className = 'fa fa-circle'></i>
            </span>
        </div>
    </div>
)
TeamInfo.propTypes = {
    name: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
    company: PropTypes.string.isRequired,
    started: PropTypes.bool.isRequired,
    finished: PropTypes.bool.isRequired
}
export default TeamInfo
