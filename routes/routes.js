const express = require( 'express' );
const request = require( 'request' );
const path = require( 'path' );

const config = require( '../models/config' );

const app = express();
const router = express.Router();

// =====================================
// Routes
// =====================================

// Users
router.get( '/', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'index.html' ) );
});

router.get( '/signup', ( req, res, next ) => {
    res.sendFile( path.join( __dirname, '../public/views', 'signup.html' ) );
});

router.post( '/login', ( req, res, next ) => {
    request.post( config.apiURL + '/auth/token', { form: req.body } ).pipe( res );
});

router.put( '/users/update', ( req, res, next ) => {
    request.put( config.apiURL + '/users/' + req.body.id, {
        headers: { 'x-access-token': req.headers['x-access-token'] },
        form: req.body
    }).pipe(res);
});

router.post( '/signup', ( req, res, next ) => {
    request.post( config.apiURL + '/users', { form: req.body } ).pipe( res );
});

// Teams


// Rooms

module.exports = router;
