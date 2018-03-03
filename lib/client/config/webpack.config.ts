import 'dotenv/config' // TODO: make sure this doesnt override production envs
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
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: 'index.template.html' }),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      'process.env': {
        API_BASE_URL: JSON.stringify(process.env.API_BASE_URL),
        PLAID_API_KEY: JSON.stringify(process.env.PLAID_API_KEY),
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.scss'],
    mainFiles: ['index'],
    modules: [path.join(__dirname, '../../../', 'node_modules')],
  },
}

export default config
