const Twit = require('twit');

const TwitterMap = require('./twitter-map.js');

const T = new Twit({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

function Twitter(options) {
  const {method = TwitterMap.getMethod(options.endpoint), endpoint, params} = options;

  console.log(`\nSending Twitter a ${method} to ${endpoint}:`, params);

  return new Promise((resolve, reject) => (
    T[method](endpoint, params)
      .then((res) => resolve(res))
      .catch((err) => reject(err))
  ));
}

module.exports = {
  Twitter,
};
