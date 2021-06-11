'use strict';

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env = {}) => {
  const isHot = env.WEBPACK_SERVE ?? false;

  const isRelease = env.NODE_ENV === 'production';
  const isTest = env.test ?? false;
  const isAnalyze = env.analyze ?? false;
  const isCI = env.ci ?? false;

  process.env.BABEL_ENV = isCI ? 'ci' : env.NODE_ENV;

  const testDevtool = isTest ? 'source-map' : undefined;

  return {
    mode: isRelease ? 'production' : 'development',
    devtool: isRelease ? testDevtool : 'inline-source-map',
    entry: './site/index.tsx',
    devServer: {
      hot: true,
      port: 3000,
      transportMode: 'ws',
      injectClient: false,
      contentBase: path.resolve(__dirname, 'dist'),
      // contentBase: path.resolve(__dirname, '../wwwroot/dist'),
      publicPath: '/',
      stats: {
        assets: false,
        entrypoints: false,
        modules: false
      }
    },
    stats: isRelease
      ? {
          assets: false,
          entrypoints: false,
          modules: false,
          children: false
        }
      : {
          cached: false,
          children: false,
          chunks: false,
          chunkModules: false,
          hash: false,
          timings: false,
          modules: false,
          assets: false,
          version: false,
          source: false,
          entrypoints: false
        },
    watchOptions: isRelease ? undefined : { aggregateTimeout: 300 },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        minSize: 30,
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all'
          }
        }
      },
      usedExports: true,
      minimizer: [
        isRelease
          ? new TerserWebpackPlugin({
              cache: true,
              parallel: true,
              sourceMap: !isRelease || isTest // Must be set to true if using source-maps in production
            })
          : undefined,
        isRelease ? new OptimizeCSSAssetsPlugin({}) : undefined
      ].filter(Boolean)
    },
    plugins: [
      new CleanWebpackPlugin({
        dry: false,
        dangerouslyAllowCleanPatternsOutsideProject: true
      }),
      isHot && new ReactRefreshWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: isRelease ? '[name].[hash].css' : '[name].css'
      }),
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        template: path.resolve(__dirname, 'index.html'),
        filename: 'index.html',
        minify: isRelease
          ? {
              collapseWhitespace: false,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true
            }
          : false,
        scriptLoading: 'defer'
      }),
      new StylelintPlugin({
        files: 'src/**/*.{css,less}',
        fix: !isRelease,
        emitError: true,
        emitWarning: true,
        failOnError: true,
        failOnWarning: true,
        cache: true,
        color: true
      }),
      isAnalyze && new BundleAnalyzerPlugin(),
      new HtmlWebpackHarddiskPlugin()
    ].filter(Boolean),
    output: {
      filename: isRelease ? '[name].[contenthash].js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      strictExportPresence: true,
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules[/\\]/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                envName: isHot ? 'hot' : undefined,
                cacheDirectory: true
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader',
            'less-loader'
          ]
        }
      ]
    }
  };
};
