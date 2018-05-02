var path = require("path");

module.exports = function (webpackConfig) {
  webpackConfig.output.path = path.join(__dirname, './dist');

  webpackConfig.babel.plugins.push('transform-runtime');
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: 'css',
  }]);

  return webpackConfig;
};
