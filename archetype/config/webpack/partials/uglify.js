"use strict";
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = function() {
  // Allow env var to disable minifcation for inspectpack usage.
  if (process.env.INSPECTPACK_DEBUG === "true") {
    return {};
  }

  const uglifyOptions = {
    sourceMap: true,
    compress: {
      warnings: false
    }
  };

  // preserve module ID comment in bundle output for optimizeStats
  if (process.env.OPTIMIZE_STATS === "true") {
    uglifyOptions.comments = /^\**!|^ [0-9]+ $|@preserve|@license/;
  }

  return { plugins: [new UglifyJSPlugin({uglifyOptions})] };
};
