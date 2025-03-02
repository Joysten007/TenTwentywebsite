const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry file
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output file
  },
  mode: "development", // Change to "production" for production build
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile JS/JSX files
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/, // Load CSS files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // HTML template
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"), // Serve files from dist
    port: 3000, // Set the local development port
    hot: true, // Enable hot reloading
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve JS and JSX files
  },
};
