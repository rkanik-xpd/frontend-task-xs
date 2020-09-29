const path = require("path");
const { folderName, folderPath } = require('./build.config.json')
const outputDirectory = folderPath + folderName

module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    outputDir: path.resolve(__dirname, outputDirectory),
    filenameHashing: process.env.NODE_ENV === "production" ? false : true,
    productionSourceMap: false,
    configureWebpack: {
        optimization: {
            splitChunks: false
        },
        output: {
            filename: 'assets/js/script.js'
        }
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].minify = false;
                return args;
            });

        if (config.plugins.has('extract-css')) {
            const extractCSSPlugin = config.plugin('extract-css');

            extractCSSPlugin &&
                extractCSSPlugin.tap(() => [{
                    filename: 'assets/css/style.css'
                }]);
        }

        config.plugins
            .delete('prefetch')
            .delete('preload');
    },
    transpileDependencies: [
        "vuetify"
    ]
};