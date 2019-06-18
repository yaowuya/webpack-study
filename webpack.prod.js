const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")//在 dist 目录中已经把 css 抽取到单独的一个 css 文件中了。
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩 CSS
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "./dist")
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',//常用的就是使用 PostCSS 进行添加前缀
                        options: {
                            ident: 'postcss',//必须要有
                            sourceMap: true,
                            plugins: loader => [
                                require('autoprefixer')({browsers: ['> 0.15% in CN']}) // 添加前缀
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css', // 设置最终输出的文件名,name和output filename一样
            chunkFilename: '[id].[hash].css'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})]
    }
}
