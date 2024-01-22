const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const stylesHandler = MiniCssExtractPlugin.loader;

module.exports = {
    entry: './src/index.css',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader", "postcss-loader",],
                sideEffects: true,
            },

        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.css",
        }),
    ],
};
/*
module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.json',
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader", "postcss-loader",],
                sideEffects: true,
            },

        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.css",
        }),
    ],
};
module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader", "postcss-loader",],
                sideEffects: true,
            },

        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
        modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.css",
        }),
    ],
};
*/