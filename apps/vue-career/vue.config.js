const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    output: {
      libraryTarget: 'system',
      filename: 'js/app.js',
    },
  },
  chainWebpack(config) {
    config.externals(["@turbo/services"]);
  }
});
