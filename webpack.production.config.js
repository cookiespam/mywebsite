var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');

module.exports = {
    entry: [
        './src/index.jsx'
    ],
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'public'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        "alias": {
            "react": "preact-compat/dist/preact-compat.js",
            "react-dom": "preact-compat/dist/preact-compat.js"
        }
    },
    module: {
        loaders
    },
    plugins: [
        new WebpackCleanupPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                warnings: false,
                screw_ie8: true,
                dead_code: true,
                drop_console: true,
                drop_debugger: true
            },
            comments: false,
            minimize: true
        }),
        new HtmlWebpackPlugin({
            template: './src/template.html',
            files: {
                js: ["bundle.js"],
            }
        }),
        new webpack.optimize.AggressiveMergingPlugin()
    ]
};