import ExtractTextPlugin from 'extract-text-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import path from 'path'
import webpack from 'webpack'

const config: webpack.Configuration = {
  context: path.join(__dirname, '../'),
  devtool: 'source-map',
  entry: './index.tsx',
  output: {
    path: path.join(__dirname, '../../../', 'public'),
    filename: 'expensus-bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.template.html' }),
    new ExtractTextPlugin('styles.css'),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss'],
    mainFiles: ['index'],
    modules: [path.join(__dirname, '../../../', 'node_modules')],
  },
}

export default config
