import { loadToken } from '../../helpers/auth'

const { token } = loadToken()
const path = window.location.pathname

if ( !token && path.indexOf( 'teams' ) > -1 )
    window.location = '/'

switch ( path ) {
    case '/teams':
    case '/logout':
    case '/my-teams':
    case '/settings':
    case '/teams/create':
        if ( token === undefined )
            window.location = '/'
        break
    case '/login':
    case '/signup':
    case '/logout':
        if ( token )
            window.location = '/'
        break
}
