const express = require( 'express' );
const request = require( 'request' );
const path = require( 'path' );

const config = require( '../models/config' );

const app = express();
const router = express.Router();

// routes
router.get( '/', ( req, res, next ) => {
    res.sendFile(path.join(__dirname, '../public/views', 'index.html'));
});

module.exports = router;
