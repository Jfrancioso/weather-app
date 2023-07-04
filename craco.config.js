module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        // Modify the webpack configuration as needed
        webpackConfig.resolve.fallback = {
          ...webpackConfig.resolve.fallback,
          path: require.resolve("path-browserify"),
          os: require.resolve("os-browserify/browser"),
          crypto: require.resolve("crypto-browserify"),
          stream: require.resolve("stream-browserify"),
        };
  
        return webpackConfig;
      },
    },
  };
  