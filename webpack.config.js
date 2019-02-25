const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

let plugins = [
  new webpack.BannerPlugin('Teac所有，翻版必究（开个玩笑）'), // 为编译过后的文件添加一个注释头
  new ExtractTextPlugin({
    filename: (getPath) => {
      return getPath('css/main.css')
    },
    allChunks: true
  }), // 分离css和js文件
  new webpack.optimize.OccurrenceOrderPlugin(), // 为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
  new webpack.optimize.UglifyJsPlugin(), // 压缩JS代码
  /*new webpack.optimize.CommonsChunkPlugin({
    name: 'common'
  }),*/ // 抽取出相同的模块，防止重复引入
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '/src/client/views/layout.ejs'),
    filename: path.join('../views/layout.html')
  })
];

let files = glob.sync('./src/client/views/**/*.ejs');

files.map(file => {
  let extname = path.extname(file);
  let basename = path.basename(file, extname);
  let relative = path.relative('./src/client/views/', file);
  let dirname = path.dirname(relative);

  if(basename != 'layout'){
    let config = {
      template: path.join(file),
      filename: path.join(`../views/${dirname}/${basename}.html`),
      inject: false
    };

    plugins.push(new HtmlWebpackPlugin(config));
  }
})

module.exports = {
  devtool: 'eval-source-map',
  entry: path.join(__dirname, "/src/client/public/js/main.js"),
  output: {
    path: path.join(__dirname, "/bin/client/public/"),
    filename: "js/bundle.js",
    publicPath: "/"
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 1000
  },
  module: {
    rules: [{
      test: '/(\.js)$/',
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      exclude: /node_modules/
    },{
      test: /(\.scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      })
    },{
      test: /(\.ejs)$/,
      use: {
        loader: 'raw-loader'
      }
    }]
  },
  plugins: plugins
}