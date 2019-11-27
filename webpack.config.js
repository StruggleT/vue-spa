const path = require('path')

const webpack = require('webpack')

const htmlWebpackPlugin = require('html-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  entry: path.join(__dirname, './src/main.js'), //入口
  output: { //输出相关文件
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [ //配置插件的节点
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html' // 指定生成页面的名字
    }),
    new VueLoaderPlugin()
  ],
  module: { //webpack默认只能打包js文件，所以要打包其他文件就要 配置第三方的loader 加载器
    rules: [ // 文件匹配规则
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, // 配置处理.css文件的第三方loader规则
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }, //处理.less的第三方loader规则
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }, //处理.scss
      {
        test: /\.(png|jpg|gif|jpeg|webp)$/,
        use: 'url-loader?limit=7000&name=[hash:8]-[name].[ext]'
      }, // 处理url路径的第三方loader规则
      {
        test: /\.(ttf|woff|woff2|svg|eot)$/,
        use: 'url-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: { loader: 'babel-loader' } // 使用babel处理es6的语法
      },
      {
        test:/\.vue$/,
        use:"vue-loader"
      }
    ]
  },
  resolve:{
    alias:{
      "vue$":"vue/dist/vue.esm.js"
    }
  }
}