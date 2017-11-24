const request = require( 'request' );

const { apiURL } = require( '../config/main' );

// =====================================
// Users
// =====================================
exports.getUserData = ( req, res, next ) => {
    request.get( `${ apiURL }/user/getData`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.getUsers = ( req, res, next ) => {
    request.get( `${ apiURL }/users` ).pipe( res );
}

exports.getUserByIdOrUsername = ( req, res, next ) => {
    request.get( `${ apiURL }/users/${ req.params.q }`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.updateUserById = ( req, res, next ) => {
    request.put( `${ apiURL }/users/${ req.params.id }`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
}

exports.deleteUserById = ( req, res, next ) => {
    request.delete( `${ apiURL }/users/${ req.params.id }`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
}

exports.getSentTeamRequests = ( req, res, next ) => {
    request.get( `${ apiURL }/requests/teams/sent`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.getTeamRequests = ( req, res, next ) => {
    request.get( `${ apiURL }/requests/teams`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.sendTeamRequest = ( req, res, next ) => {
    request.post( `${ apiURL }/requests/teams/send`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
}

exports.declineTeamRequest = ( req, res, next ) => {
    request.delete( `${ apiURL }/requests/teams/destroy`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
}

exports.getAllNotifications = ( req, res, next ) => {
    request.get( `${ apiURL }/notifications`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.updateAllNotifications = ( req, res, next ) => {
    request.put( `${ apiURL }/notifications`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
}

exports.deleteAllNotifications = ( req, res, next ) => {
    request.delete( `${ apiURL }/notifications`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.updateOneNotification = ( req, res, next ) => {
    request.put( `${ apiURL }/notifications/${ req.params.id }`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
}

exports.deleteOneNotification = ( req, res, next ) => {
    request.delete( `${ apiURL }/notifications/${ req.params.id }`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.adminPromotion = ( req, res, next ) => {
    request.post( `${ apiURL }/admins`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
}

exports.adminDemotion = ( req, res, next ) => {
    request.delete( `${ apiURL }/admins`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
}

// =====================================
// Teams
// =====================================
exports.getTeams = ( req, res, next ) => {
    request.get( `${ apiURL }/teams`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.createTeam = ( req, res, next ) => {
    request.post( `${ apiURL }/teams`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
}

exports.getTeamByIdOrName = ( req, res, next ) => {
    request.get( `${ apiURL }/teams/${ req.params.q }`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.updateTeamById = ( req, res, next ) => {
    request.put( `${ apiURL }/teams/${ req.params.id }`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
}

exports.getTeamsOfUserOrAdmin = ( req, res, next ) => {
    request.get( `${ apiURL }/teams/users/${ req.params.id }`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.getReadyMembers = ( req, res, next ) => {
    request.get( `${ apiURL }/teams/${ req.params.id }/ready`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.toggleReadyState = ( req, res, next ) => {
    request.post( `${ apiURL }/teams/${ req.params.id }/ready`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.addMemberToTeam = ( req, res, next ) => {
    request.post( `${ apiURL }/teams/members/add`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
}

exports.removeMemberFromTeam = ( req, res, next ) => {
    request.delete( `${ apiURL }/teams/members/destroy`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
}

// =====================================
// Search
// =====================================
exports.searchAny = ( req, res, next ) => {
    request.post( `${ apiURL }/search/any?q=${ req.query.q }`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.searchUsers = ( req, res, next ) => {
    request.post( `${ apiURL }/search/users?q=${ req.query.q }`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

exports.searchTeams = ( req, res, next ) => {
    request.post( `${ apiURL }/search/teams?q=${ req.query.q }`, {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] }
    }).pipe( res );
}

// =====================================
// Match/Run
// =====================================
// match routes here

// =====================================
// Authentication
// =====================================
exports.signup = ( req, res, next ) => {
    request.post( `${ apiURL }/users`, { form: req.body } ).pipe( res );
}

exports.loginUser = ( req, res, next ) => {
    request.post( `${ apiURL }/auth/token`, { form: req.body } ).pipe( res );
}

exports.resetPassword = ( req, res, next ) => {
    request.post( `${ apiURL }/auth/reset-password`, { form: req.body } ).pipe( res );
}

exports.forgotPassword = ( req, res, next ) => {
    request.post( `${ apiURL }/auth/reset-password`, { form: req.body } ).pipe( res );
}
