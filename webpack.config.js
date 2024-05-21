const path = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const autoprefixer = require('autoprefixer')

//data
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');

module.exports = {
    mode: 'development',
    stats: {
        children: true
    },

    entry: {
        index: './src/js/index.js',
        // Runtime code for hot module replacement
        hot: 'webpack/hot/dev-server.js',
        // Dev server client for web socket transport, hot and live reload logic
        client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true',
    },
    devtool: "inline-source-map",

    devServer: {
        static: './dist',


        //its enable the HMR
        hot: true,
        client: false,
    },

    plugins: [
        new htmlWebpackPlugin({
            template: './src/pages/index.html',
            filename: 'index.html',
            chunks: ['index'], // Inject only the 'index' bundle
        }),

        new htmlWebpackPlugin({
            template: './src/pages/about.html',
            filename: 'about.html',
            chunks: ['about'], // Inject only the 'about' bundle
        }),

        new htmlWebpackPlugin({
            template: './src/pages/contact.html',
            filename: 'contact.html',
            chunks: ['contact'], // Inject only the 'contact' bundle
        }),

        // ! Using [name] placeholder for dynamic filenames
        // new htmlWebpackPlugin({
        //     template: './src/productDetail.html', 
        //     filename: '[name].html',
        // }),

        // Plugin for hot module replacement
        new webpack.HotModuleReplacementPlugin(),
    ],

    output: {
        // filename: 'bundle.js',
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    module: {
        rules: [

            //Babel
            {
                test: /\.(?:js|mjs|cjs)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ]
                    }
                }
            },

            //SASS Loader
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: 'style-loader'
                    },
                    {
                        // Interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader: 'css-loader'
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    autoprefixer
                                ]
                            }
                        }
                    },
                    {
                        // Loads a SASS/SCSS file and compiles it to CSS
                        loader: 'sass-loader'
                    }
                ]
            },


            //Image-Asset Loader
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            },

            //Font Loader
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },

            // Data Loaders
            {
                test: /\.(csv|tsv)$/i,
                use: ['csv-loader'],
            },
            {
                test: /\.xml$/i,
                use: ['xml-loader'],
            },
            {
                test: /\.toml$/i,
                type: 'json',
                parser: {
                    parse: toml.parse,
                },
            },
            {
                test: /\.yaml$/i,
                type: 'json',
                parser: {
                    parse: yaml.parse,
                },
            },
            {
                test: /\.json5$/i,
                type: 'json',
                parser: {
                    parse: json5.parse,
                },
            },

        ]
    },

    optimization: {
        runtimeChunk: 'single',
    },
};