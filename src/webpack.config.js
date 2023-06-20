// const path = require("path");

module.exports = {
  // Other webpack configurations go here...
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      buffer: require.resolve("buffer/"),
      util: require.resolve("util/"),
      path: require.resolve("path-browserify"),
      fs: false,
    },
  },
};