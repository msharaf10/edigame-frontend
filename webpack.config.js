const WatchLiveReloadPlugin = require('webpack-watch-livereload-plugin');
const webpack = require( 'webpack' );
const path = require( 'path' );

module.exports = {
    entry: {
        index: './controllers/components/index/index.jsx',
        signup: './controllers/components/signup/signup.jsx',
        search: './controllers/components/search/search.jsx',
        team: './controllers/components/teams/team.jsx',
        newTeam: './controllers/components/teams/create-team.jsx',
        users: './controllers/components/users/users.jsx'
    },
    output: {
        path: path.join(__dirname, 'public/js'),
		filename: '[name].min.js'
	},
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
	},
	plugins: [
		new WatchLiveReloadPlugin({
			files: [
                '**/**/*.js',
				'**/**/*.css'
			]
		}),
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false, drop_console: true }
        })
	]
};
