const webpack = require('webpack');

module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: '3333'
    },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"' + process.env.NODE_ENV + '"'
                }
            }),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jquery: 'jquery',
                'window.jQuery': 'jquery',
                jQuery: 'jquery'
            })
        ]
    },
};