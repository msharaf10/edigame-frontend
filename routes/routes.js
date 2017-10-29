const express = require( 'express' );
const path = require( 'path' );

const paths = require( './paths' );
const requests = require( './requests' );

const { validID } = require( '../helpers/helpers' );

const router = express.Router();


// =====================================
// Middleware
// =====================================
router.param( 'id', ( req, res, next ) => {
    if ( !validID( req.params.id ) )
        return res.status( 400 ).json( { error: 'invalid id' } );
    next();
});

// validate mongoose objects ID
exports.validateIDs = ( req, res, next ) => {

	if ( req.body.userId && !validID( req.body.userId ) )
		return res.status( 400 ).json( { error: 'Invalid ID' } );

	if ( req.body.teamId && !validID( req.body.teamId ) )
		return res.status( 400 ).json( { error: 'Invalid ID' } );

	if ( req.body.adminId && !validID( req.body.adminId ) )
		return res.status( 400 ).json( { error: 'Invalid ID' } );

	next();
}

// =====================================
// Routes
// =====================================
/*  Serve HTML File  */
router.get( paths, ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'index.html' ) );
});

// ======================
// users
// ======================
router.route( '/api/users' )
    .get( requests.getUsers )
    .post( requests.signup );

router.route( '/api/users/:q' )
    .get( requests.getUserByIdOrUsername );

router.route( '/api/users/:id' )
    .put( requests.updateUserById )
    .delete( requests.deleteUserById );

router.route( '/api/requests/teams' )
    .get( requests.getTeamRequests );

router.route( '/api/requests/send' )
    .post( requests.sendTeamRequest );

router.route( '/api/requests/destroy' )
    .delete( requests.declineTeamRequest );

router.route( '/api/notifications' )
    .get( requests.getAllNotifications )
    .put( requests.markAllNotificationsAsSeenOrRead )
    .delete( requests.deleteAllNotifications );

router.route( '/api/notifications/:id' )
    .put( requests.markOneNotificationAsSeenOrRead )
    .delete( requests.deleteOneNotification );

router.route( '/api/admins' )
    .post( requests.adminPromotion )
    .delete( requests.adminDemotion );

// ======================
// Teams
// ======================
router.route( '/api/teams' )
	.get( requests.getTeams )
	.post( requests.createTeam );

router.route( '/api/teams/:q' )
	.get( requests.getTeamByIdOrName );

router.route( '/api/teams/:id' )
	.put( requests.updateTeamById );

router.route( '/api/teams/users/:id' )
	.get( requests.getTeamsOfUserOrAdmin );

router.route( '/api/teams/:id/ready' )
	.get( requests.getReadyMembers )
	.post( requests.toggleReadyState );

router.route( '/api/teams/members/add' )
	.post( requests.addMemberToTeam );

router.route( '/api/teams/members/destroy' )
	.delete( requests.removeMemberFromTeam );

// ======================
// Search
// ======================
router.post( '/api/search', requests.searchAny );
router.post( '/api/search/users', requests.searchUsers );
router.post( '/api/search/teams', requests.searchTeams );

// ======================
// Match/Run
// ======================
// match routes here

// ======================
// Authentication
// ======================
router.post( '/api/auth/login', requests.loginUser );
router.post( '/api/auth/reset-password', requests.resetPassword );
router.post( '/api/auth/forgot-password', requests.forgotPassword );

exports.routes = router;
