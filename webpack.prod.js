const path = require('path')
const webpack = require("webpack")
const HtmlWebPackPlugin = require("html-webpack-plugin")
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    // output: {
    //     libraryTarget: 'var',
    //     library: 'Client'
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [{ loader: 'style-loader', }, { loader: 'css-loader', options: { sourceMap: true, }, }, { loader: 'sass-loader', options: { sourceMap: true, }, },],
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/view/index.html",
            filename: "./index.html",
        }),
        new WorkboxPlugin.GenerateSW() //service worker
    ]
}