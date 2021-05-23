const path = require('path');

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    entry: './src/main.ts',
    mode: isProd ? 'production' : 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, isProd ? '' : 'example_vault/.obsidian/plugins/vega-codeblocks-obsidian'),
        library: {
            type: 'commonjs'
        }
    },
    externals: /^obsidian$/,
    module: {
        rules: [
            {test: /\.ts$/, loader: 'ts-loader'}
        ]
    }
}