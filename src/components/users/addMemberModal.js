import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { defaultImg } from '../../helpers/helpers'
import TeamOfModal from './teamOfModal'

const AddMemberModal = ({ member, closeModal, teams, sendTeamRequest }) => (
    <div className = 'add-member-modal'>
        <div className = 'add-new-member'>
            <div className = 'add-modal-content'>
                <div className = 'add-modal-header'>
                    <div className = 'close-add-modal' onClick = { closeModal }>
                        <i className = 'fa fa-times'></i>
                    </div>
                    <div className = 'member-info'>
                        <p>Send Team Request</p>
                        <img className = 'img-thumbnail' src = { `/img/avatars/${ member.imgURL || defaultImg }` } style = {{ height: '40px', marginRight: '10px' }} />
                        <span className = 'text-capitalize'>
                            { `${ member.firstName } ${ member.lastName }` }
                        </span>
                    </div>
                </div>
                <div className = 'add-modal-body'>
                    {
                        !teams.length ? <p>You don't have teams yet, <Link to = '/teams/create'>Create team?</Link></p> :
                        <div className = 'modal-table-wrap'>
                            <table className = 'team-members-wrap table table-hover'>
                                <thead>
                                    <tr>
                                        <th scope = 'col'>#</th>
                                        <th scope = 'col'>Team Name</th>
                                        <th scope = 'col'>Company</th>
                                        <th scope = 'col'># Of Members</th>
                                        <th scope = 'col'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        teams.map( ( team, index ) => {
                                            return <TeamOfModal
                                                        key = { team._id }
                                                        index = { index + 1 }
                                                        team = { team }
                                                        member = { member }
                                                        sendTeamRequest = { sendTeamRequest }
                                                    />
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                {
                    !teams.length ? null :
                    <div className = 'add-modal-footer'>
                        <div className = 'alert alert-warning'>
                            Becareful when you send requests, There's <strong>NO</strong> go back.
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
)

AddMemberModal.propTypes = {
    teams: PropTypes.array.isRequired,
    member: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    sendTeamRequest: PropTypes.func.isRequired
}
export default AddMemberModal
