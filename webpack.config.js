/* clear the console */
process.stdout.write('\x1Bc');

const WatchLiveReloadPlugin = require( 'webpack-watch-livereload-plugin' );
const webpack = require( 'webpack' );
const path = require( 'path' );

const PLUGINS_PROD = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify( 'production' )
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true
        },
        parallel: {
            cache: true,
            workers: 2
        }
    })
];

const PLUGINS_DEV = [
    new WatchLiveReloadPlugin({
        files: [
            '**/**/*.js',
            '**/**/*.css'
        ]
    })
];

module.exports = {
    entry: {
        index: './src/index.js',
        auth: './src/assets/js/auth.js',
        main: './src/assets/js/main.js'
    },
    output: {
        path: path.join( __dirname, 'public/js' ),
        filename: '[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.js|.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            }
        ]
    },
    plugins: process.env.NODE_ENV === 'production' ? PLUGINS_PROD : PLUGINS_DEV
};
