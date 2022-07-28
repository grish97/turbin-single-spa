const {merge, mergeWithRules} = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

const {TsConfigPathsPlugin} = require('awesome-typescript-loader')

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "turbo",
    projectName: "react-layout",
    webpackConfigEnv,
    argv,
  });

  const config = mergeWithRules({
    module: {
      rules: {
        test: "match",
        use: "replace",
      },
    },
  })(defaultConfig, {
    module: {
      rules: [{
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      }]
    },
    resolve: {
      extensions: ['.tsx', 'ts', '.js', '.json'],
      plugins: [
        new TsConfigPathsPlugin()
      ]
    },
  });

  return merge(config, {
    // modify the webpack config however you'd like to by adding to this object
  });
};
