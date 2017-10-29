/*
*
*  ->  FILENAME :    index.js
*
*  ->  RESPONSIBILITY :
*           Server container file
*
*  -> TO GET STARTED :
*           run `npm start`
*
*  ->  AUTHOR :		Mohamed Sharaf
*  ->  EMAIL :		mohamedsharafm10@gmail.com
*
*  ->  LAST MODIFIED BY :
*           Mohamed Sharaf
*
*/

const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const logger = require( 'morgan' );
const path = require( 'path' );

const { server } = require( './config/main' );
const { routes, validateIDs } = require( './routes/routes' );

const app = express();

if ( app.get( 'env' ) !== 'production' )
    app.use( logger( 'dev' ) );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.use( validateIDs );
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
	if ( app.get( 'env' ) === 'development' ) console.error( err.message );

	let status = err.status || 500;
	let message;

	if ( status >= 400 && status < 500 && err.message )
		message = err.message;
	else
		message = '';

	res.status( status ).json( { error: message } );
});

let SERVER = app.listen( server.port ),
	port = SERVER.address().port,
	mode = app.get( 'env' );

console.log( `Listening at http://localhost:${ port } in ${ mode }` );
