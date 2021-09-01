module.exports = {
  reactStrictMode: true,

  // hot reload
  webpack: (config, { dev }) => {
    // if (dev) {
    //   config.watchOptions = {
    //     poll: 1000,
    //     aggregateTimeout: 200,
    //   };
    // }
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 200,
    };
    return config;
  },

}
