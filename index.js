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
app.use( express.static( path.join(__dirname, 'public' )));

app.use( '/', routes );

let server = app.listen( config.port ),
	port = server.address().port,
	mode = app.get( 'env' );

console.log( 'Listening at http://localhost:%s in %s', port, mode );
