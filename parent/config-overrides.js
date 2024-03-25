const path = require('path');
const { aliasDangerous } = require('react-app-rewire-alias/lib/aliasDangerous');

module.exports = function override(config) {
  aliasDangerous({
    '@common': path.resolve(__dirname, '../test/src/common'),
    // Add other aliases or overrides as needed
  })(config);

  return config;
};
