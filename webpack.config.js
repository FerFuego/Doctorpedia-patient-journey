const basicJs = `//Performance
import performance from "../app/usefull/performance";
performance.init();

//Video support
//import VideoSupport from "../app/usefull/video-support";

//Dynamic js load
//import moduleCaller from "../app/usefull/module-caller";

//Modules (Import your JS files here)
import Navbar from "../app/modules/navbar";


//Add JS class and HTML class for each module
const navbar = new Navbar();
navbar.init();

//moduleCaller();


//Page Animations
import animations from "../app/usefull/animations";
animations.init();`;

const basicScss = `@import "../global/global";`

//***************************** */
//Autogenerate Entry Points for webpack
//***************************** */

//Read Php Files
const rootDir = './';
const templatesDir = './templates';
const fs = require('fs');

let files = [];

fs.readdirSync(rootDir).forEach(file => {
    files.push(file);
});

fs.readdirSync(templatesDir).forEach(file => {
    files.push(file);
});

const singles = files.filter(file => file.search('single') != -1);
const archives = files.filter(file => file.search('archive') != -1);
const templates = files.filter(file => file.search('page') != -1);
const allPages = singles.concat(archives).concat(templates);

let entryPoints = new Object();
allPages.forEach(page => {
    let entryPoint = new Object();
    entryPoint[page.split('.')[0]] = [`./assets/js/pages/${page.split('.')[0]}.js`, `./assets/scss/pages/${page.split('.')[0]}.scss`];
    entryPoints = {
        ...entryPoints,
        ...entryPoint
    };
})

//Add custom entry points
entryPoints = {
    ...entryPoints,
    ...{'404-page': [`./assets/js/pages/404-page.js`, `./assets/scss/pages/404-page.scss`],
        'spa-webpage': [`./assets/js/app/usefull/barba-init.js`]}
}

//Check if js and scss files exists, if not just create new ones.
for (let entryPoint in entryPoints) {
    const dirs = entryPoints[entryPoint];
    if(entryPoint != 'spa-webpage'){
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                if(dir.search('css') != -1){
                    fs.writeFileSync(dir, basicScss);
                }else{
                    fs.writeFileSync(dir, basicJs);
                }
            }
        })
    }
}

//***************************** */
// Webpack configuration.
//***************************** */

const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const autoprefixer = require('autoprefixer');


//Live local server proxy
require('dotenv').config()

// JS Directory path.
const JS_DIR = path.resolve(__dirname, 'assets/js');

// BUILD Directory path.
const BUILD_DIR = path.resolve(__dirname, 'assets/build');

const entry = entryPoints;

const output = {
    path: BUILD_DIR,
    publicPath: '/',
    filename: '[name].min.js'
}

const plugins = (argv) => [
    new CleanWebpackPlugin({
        cleanStaleWebpackAssets: ('production' === argv.mode)
    }),

    new MiniCssExtractPlugin({
        filename: '[name].min.css'
    }),

    new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        proxy: process.env.LOCAL_SERVER_URL || 'http://local.boiler.com' //Do not change this value! use .env-webpack to browser sync
    })
]

const rules = [
    {
        test: /\.js$/,
        include: [JS_DIR],
        exclude: /node_modules/,
        use: 'babel-loader'
    },
    {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    url: false
                }
            },
            'postcss-loader',
            'sass-loader',
            
        ]
    }
]

module.exports = (env, argv) => ({
    entry: entry,
    output: output,
    devtool: 'source-map',

    module: {
        rules: rules
    },

    devServer: {
        writeToDisk: true
    },

    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessor: cssnano
            }),

            new UglifyJsPlugin({
                cache: false,
                parallel: true,
                sourceMap: false
            })
        ]
    },

    plugins: plugins(argv),
    externals: {
        jquery: 'jQuery'
    },
    target: 'node'
})