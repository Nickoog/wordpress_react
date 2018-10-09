const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const dev = process.env.NODE_ENV === "development";

let cssLoaders = [
      { loader: 'css-loader', options: { importLoaders: 1 , minimize: !dev }, },
]
if (!dev) {
  cssLoaders.push({
      loader: 'postcss-loader',
      options: {
        plugins: (loader) => [
          require('autoprefixer')({
            browsers: ['last 2 versions', 'ie > 8']
          }),
        ]
      }
  })
}

let config = {
  entry: {
    app: ['./assets/styles/main.scss','./assets/scripts/index.jsx']
  },
  watch: dev? true : false, 
  output: {
    path: path.resolve('./dist'),
    filename: dev? '[name].js' : '[name].[chunkhash:8].js',
    publicPath: "/dist/"
  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            use: ['babel-loader']
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: cssLoaders
            })
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [...cssLoaders, 'sass-loader']
            })
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
                'file-loader?name=[name].[ext]&outputPath=images/&publicPath=http://react.test/marquis/wp-content/themes/marquis/dist/images',
                'image-webpack-loader'
            ]
        },
        { 
            test: /\.(woff2?|svg)$/, 
            loader: 'url-loader?limit=10000&name=fonts/[name].[ext]' 
        },
        { 
            test: /\.(ttf|eot)$/, 
            loader: 'file-loader?name=fonts/[name].[ext]' 
        }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
        filename: dev? '[name].css' : '[name].[contenthash:8].css',
        disable: dev
      }
    ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}

if (!dev) {
  config.plugins.push(new UglifyJsPlugin());
  config.plugins.push(new ManifestPlugin());
  config.plugins.push(
    new CleanWebpackPlugin(['dist'],{
      root: path.resolve('./'),
      verbose: true,
      dry: false
    })
  );
}

module.exports = config