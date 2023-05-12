const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),

      // Generates the Service Worker, which will generate the logic for the files that will be cached
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // Creates the settings for the Manifest
      new WebpackPwaManifest({
        // prevents adding unique has for the file names.
        fingerprints: false,
        // Injects the web manifest automatically
        inject: true,
        // Name of the application
        name: 'Just Another Text Editor',
        // short-name for the homescreen
        short_name: 'JATE',
        // about the application
        description: 'Edit Code Snippets',
        // background color for the app
        background_color: '#225ca3',
        // Theme of the app
        theme_color: '#225ca3',
        // The url that is loaded when the application is started
        start_url: './',
        // This is where the assests are loaded
        publicPath: './',
        // the icon for the app with the varying sizes
        // and the directory as to where those icons should be stored.
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ], 
      }),
    ],

    module: {
      rules: [
        {
          // Regex checks for specifically css files
          test: /\.css$/i,
          // Injects the css into the html file, and pasrses css files and resolves dependecies
          use: ['style-loader', 'css-loader'],
        },
        {
          // uses babel to translate the es6 javascript into es5 so that older browsers are able to use the application.
          test: /\.m?js$/,
          exclude: /node_modules/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ],
            },
          },
        },
      ],
    },
  };
};
