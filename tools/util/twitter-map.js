const TwitterAPILibrary = require('./twitter-api-library.js');

exports.getMethod = function getMethod(endpoint) {
  return TwitterAPILibrary.methods[endpoint];
};
