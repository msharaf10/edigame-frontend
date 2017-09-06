const express = require( 'express' );
const request = require( 'request' );
const path = require( 'path' );

const config = require( '../models/config' );

const app = express();
const router = express.Router();

// =====================================
// Routes
// =====================================

// ======================
// users
// ======================
// serve files
router.get( '/', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'index.html' ) );
});

router.get( '/signup', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'signup.html' ) );
});

router.get( '/signup/admin', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'signup-admin.html' ) );
});

router.get( '/users', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'users.html' ) );
});

router.get( '/settings', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'settings.html' ) );
});

// APIs
router.post( '/login', ( req, res, next ) => {
    request.post( config.apiURL + '/auth/token', { form: req.body } ).pipe( res );
});

router.put( '/users', ( req, res, next ) => {
    request.put( config.apiURL + '/users/' + req.body.id, {
        headers: { 'x-access-token' : req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
});

router.post( '/signup', ( req, res, next ) => {
    request.post( config.apiURL + '/users', { form: req.body } ).pipe( res );
});

router.put( '/settings', ( req, res, next ) => {
    request.put( config.apiURL + '/users/' + req.body.id, {
        headers: { 'x-access-token' : req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
});

router.delete( '/user', ( req, res, next ) => {
    request.delete( config.apiURL + '/users/' + req.body.id, {
        headers: { 'x-access-token' : req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
});

// ======================
// Teams
// ======================
// serve files
router.get( '/admin/team', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '..', 'public/views', 'admin-team.html' ) );
});

router.get( '/teams', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '..', '/public/views', 'teams.html' ) );
});

router.get( '/my-team', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'user-team.html' ) );
});

router.get( '/teams/create', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'create-team.html' ) );
});

// APIs
router.get( '/teams/get-all-teams', ( req, res, next ) => {
    request.get( config.apiURL + '/teams' ).pipe( res );
});

router.get( '/teams/get-one-team', ( req, res, next ) => {
    request.get( config.apiURL + '/teams' ).pipe( res );
});

router.post( '/teams/create', ( req, res, next ) => {
    request.post( config.apiURL + '/teams', {
        headers: { 'x-access-token' : req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
});

router.put( '/teams', ( req, res, next ) => {
    request.put( config.apiURL + '/teams/' + req.body.id, {
        headers: { 'x-access-token' : req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
});

router.delete( '/teams', ( req, res, next ) => {
    request.delete( config.apiURL + '/teams/' + req.body.id, {
        headers: { 'x-access-token' : req.headers[ 'x-access-token' ] }
    }).pipe( res );
})
// ======================
// rooms
// ======================


// ======================
// Search
// ======================
router.get( '/search', (req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'search.html' ) );
});

router.get( '/api/search/user', ( req, res, next ) => {
    request.get( config.apiURL + '/search/user?q=' + req.query.q ).pipe( res );
});

router.get( '/api/search/team', ( req, res, next ) => {
    request.get( config.apiURL + '/search/team?q=' + req.query.q ).pipe( res );
});
module.exports = router;
