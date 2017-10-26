const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const logger = require( 'morgan' );
const path = require( 'path' );

const config = require( './models/config' );
const routes = require( './routes/routes' );

const app = express();

if ( app.get( 'env' ) !== 'production' )
    app.use( logger( 'dev' ) );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use( express.static( path.join( __dirname, 'public' )));

// =====================================
// Routes
// =====================================
app.use( '/', routes );

// =====================================
// Error Handler
// =====================================
app.use( ( req, res, next ) => {
	let err = new Error( 'NOT FOUND' );
	err.status =  404;
	next( err );
});

app.use( ( err, req, res, next ) => {
	if ( app.get( 'env' ) === 'development' ) console.log( err.message );

	let status = err.status || 500;
	let message;

	if ( status >= 400 && status < 500 && err.message )
		message = err.message;
	else
		message = '';

	res.status( status ).json( { message } );
});

let server = app.listen( config.port ),
	port = server.address().port,
	mode = app.get( 'env' );

console.log( 'Listening at http://localhost:%s in %s', port, mode );
