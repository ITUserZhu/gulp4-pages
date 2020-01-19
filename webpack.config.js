const webpack = require('webpack');

module.exports = {
    mode: 'production',
    // devtool: 'source-map',
    performance : {
        hints : false
    },   
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /(lord-icon-element|project)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:[
                            ["@babel/preset-env", {
                                "corejs": "2",
                                "modules": false,
                                "targets": {
                                    "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                                },
                                "useBuiltIns": "usage"
                            }]
                        ],
                        plugins:[
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-transform-modules-commonjs",
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery", // npm
            jQuery: "jquery", // 本地Js文件
        })
    ]
}