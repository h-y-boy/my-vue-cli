//公共配置

const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MinicCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const chalk = require('chalk')

module.exports = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'js/chunk-[contenthash].js',
        //自动清理旧dist
        clean: true
    },
    plugins: [
        //打包html文件
        new HtmlWebPackPlugin({
            //输入模板
            template: './public/index.html',
            //打包后名字
            filename: 'index.html',
            //js文件插入到body里
            inject: 'body'

        }),
        new MinicCssExtractPlugin({
            filename: 'styles/chunk-[contenthash].css',
            ignoreOrder: true
        }),
        // new VueTemplateCompiler()
        new VueLoaderPlugin(),

        //设置进度条
        new ProgressBarPlugin({
            format: `build [:bar] ${chalk.green.bold(':percent')} (:elapsed seconds)`
        })
    ],
    module: {
        rules: [
            {
                test: /\.(css|s[cs]ss)$/,
                use: [
                    MinicCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/,
                type: 'asset',
                parser: {
                    //转base64的条件
                    dataUrlCondition: {
                        maxSize: 500 * 1024,
                    }
                },
                generator: {
                    filename: 'images/chunk-[contenthash][ext][query]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            }
        ]
    },
    resolve: {
        //路径别名
        alias: {
            '@': path.resolve('./src'),
            asserts: '~/assets',
        },
        //引入文件时省略后缀
        extensions: ['.js', '.ts', '.less', '.vue']
    }
}