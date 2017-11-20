import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchTeams, filterTeam } from '../actions/index'
import Teams from '../components/teams/teams'

const getFilteredTeams = ( teams, query ) => {
    return teams.filter( team => {
        return team.name.toLowerCase().indexOf( query.toLowerCase() ) > -1
    })
}

class TeamsPage extends Component {
    static propTypes = {
        teams: PropTypes.array.isRequired,
        msg: PropTypes.string.isRequired,
        query: PropTypes.string.isRequired
    }

    componentDidMount() {
        const { dispatch } = this.props
        this.FetchTeams( dispatch )
    }

    FetchTeams = dispatch => {
        dispatch( fetchTeams() )
    }

    render() {
        const { dispatch, teams, msg, query } = this.props
        return (
            <div className = 'teams-holder'>
                <h3 className = 'text-center'>Teams</h3>
                <div className = 'finder-wrap'>
                    <label htmlFor = 'team-finder'>Find a team by name:</label>
                    <div className = 'input-group'>
                        <span className = 'input-group-addon'>
                            <i className = 'fa fa-search'></i>
                        </span>
                        <input
                            autoFocus
                            id = 'team-finder'
                            value = { query }
                            className = 'form-control'
                            onChange = {
                                e => dispatch( filterTeam( e.target.value ) )
                            }
                            placeholder = 'Search...'
                        />
                    </div>
                </div>
                {
                    msg ? <p>Nothing to show...</p> :
                    <Teams
                        teams = { teams }
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = ({ teams, filter }) => ({
    teams: getFilteredTeams( teams.array, filter.team ),
    query: filter.team,
    msg: teams.msg
})

export default connect( mapStateToProps )( TeamsPage )
