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
    res.sendFile( path.join( __dirname, '../public/views', 'index.html' ) );
});

router.get( '/players', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'index.html' ) );
});

router.get( '/settings', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'index.html' ) );
});

// APIs
router.get( '/users/get-one-user/:id', ( req, res, next ) => {
    console.log( req.params );
    request.get( config.apiURL + '/users/' + req.params.id ).pipe( res );
});

router.get( '/users/get-all-users', ( req, res, next) => {
    request.get( config.apiURL + '/users' ).pipe( res );
})

router.post( '/login', ( req, res, next ) => {
    request.post( config.apiURL + '/auth/token', { form: req.body } ).pipe( res );
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
router.get( '/teams', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '..', '/public/views', 'index.html' ) );
});

router.get( '/teams/create', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'index.html' ) );
});

router.get( '/team/:name', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'index.html' ) );
});

// APIs
router.get( '/teams/get-all-teams', ( req, res, next ) => {
    request.get( config.apiURL + '/teams' ).pipe( res );
});

router.get( '/teams/get-one-team/:id', ( req, res, next ) => {
    request.get( config.apiURL + '/teams/' + req.params.id ).pipe( res );
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
});

router.post( '/api/teams/add/player', ( req, res, next ) => {
    console.log( req.body );
    request.post( config.apiURL + '/teams/add/user', {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
});

router.post( '/api/teams/remove/player', ( req, res, next ) => {
    request.post( config.apiURL + '/teams/remove/user', {
        headers: { 'x-access-token': req.headers[ 'x-access-token' ] },
        form: req.body
    }).pipe( res );
});

// ======================
// rooms
// ======================
// serve files
router.get( '/room/team/:id/ready', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'room-ready.html' ) );
});

router.get( '/room/team/:id/online', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'room-online.html' ) );
});

// APIs
router.put( '/api/room/ready/:id', ( req, res, next ) => {
    request.get( config.apiURL + '/room/ready/' + req.params.id ).pipe( res );
});

router.get( '/api/room/online/:id', ( req, res, next ) => {
    request.get( config.apiURL + '/room/online/' + req.params.id ).pipe( res );
});

router.put( '/api/room/player/ready/toggle/:id', ( req, res, next ) => {
    request.put( config.apiURL + '/room/user/ready/toggle' + req.params.id)
});

// ======================
// Search
// ======================
// serve files
router.get( '/search', (req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'search.html' ) );
});

// APIs
router.get( '/api/search/user', ( req, res, next ) => {
    request.get( config.apiURL + '/search/user?q=' + req.query.q ).pipe( res );
});

router.get( '/api/search/team', ( req, res, next ) => {
    request.get( config.apiURL + '/search/team?q=' + req.query.q ).pipe( res );
});

router.get( '/api/search/team/:name/players', ( req, res, next ) => {
    request.get( config.apiURL + '/teams/users/' + req.params.name ).pipe( res );
})

module.exports = router;
