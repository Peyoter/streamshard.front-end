const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        },
        extensions: ['.js', '.vue'],
    },
    output: {
        filename: 'app.js'
    },
    module: {
        rules: [
            {
                test: /\.vue?$/,
                exclude: /(node_modules)/,
                use: 'vue-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/i,
                loader: "file-loader",
                options: {
                    name: '/public/[ext]/[name].[ext]',
                },
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "bootstrap-colorpicker": './styles/assets/plugins/colorpicker/bootstrap-colorpicker.js'
        }),
        new CopyWebpackPlugin([
            {from: 'src/img', to: 'img'}])
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            mainUrl: 'http://streamshard.ru',
            apiUrl: 'http://api.streamshard.ru',
            socket: 'ws://193.200.74.69:80',
            twitchAuth: {
                clientId: 'c6tqqprwhk75s057rhqd3d5nfickoz',
                redirectURI: 'http://streamshard.ru/settings',
                scope: 'user_read+chat:read+channel_subscriptions',
            }
        })
    },
}
