const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');
const { folderName, folderPath } = require('./build.config.json')
const outputDirectory = path.resolve(__dirname, folderPath + folderName)

module.exports = {
    mode: 'production',
    entry: {
        'index': './src/index.js'
    },
    output: {
        path: outputDirectory,
        filename: 'server.js'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'api', to: `${outputDirectory}/api` }
            ],
        }),
    ],
};