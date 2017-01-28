/* eslint-disable camelcase */
const csv = require('csvtojson');

const TwitterAPILibrary = require('./util/twitter-api-library.js');
const {Twitter} = require('./util/twitter-service.js');

exports.command = 'twitter';
exports.description = 'Various collection of Twitter tools';
exports.builder = (yargs) =>
  yargs
    .usage('Usage: $0 twitter <options>')
    .option('endpoint', {
      alias: 'e',
      describe: 'The Twitter API endpoint to use',
      required: false,
      type: 'string',
      choices: TwitterAPILibrary.endpoints,
    })
    .option('method', {
      alias: 'm',
      describe: 'The API method to use',
      required: false,
      type: 'string',
      choices: ['get', 'post'],
    })
    .option('params', {
      alias: ['p', 'options', 'o'],
      describe: 'JSON string of params. See Twitter API Docs for more info - ' +
        'https://dev.twitter.com/rest/reference',
      required: false,
      type: 'string',
    })
    .option('file', {
      alias: ['f', 'csv'],
      describe: 'CSV file of `screen_name`s to contact',
      required: false,
      type: 'string',
    })
    .example('$0 twitter -e direct_messages/new ' +
      '-p \'{"screen_name": "helloBrent", "text": "hello world"}\'',
      'Send helloBrent a direct message on Twitter');

exports.handler = ({method, endpoint, params, file}) => {
  const paramsJson = JSON.parse(params);
  if (!file) {
    return Twitter({method, endpoint, params: paramsJson})
      .then((__res) => {
        console.log(`Successful Twitter call to ${endpoint}!`);
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }

  const users = [];
  let errors = 0;

  // If CSV file is used, cycle through the users and wait X seconds between API
  // calls so we don't hit our limit right away.
  // Rate Limits - https://support.twitter.com/articles/15364
  return csv()
    .fromFile(file)
    .on('json', (user) => {
      users.push(user);
    })
    .on('done', (err) => {
      if (err) {
        console.log('Error converting CSV to JSON:', err);
      }

      const userCount = users.length;

      if (userCount > 1000) {
        console.warn(`You have ${userCount} users and WILL exceed the daily rate limit`);
      } else if (userCount >= 500) {
        console.warn(`You have a high user count of ${userCount} and may hit a daily rate limit`);
      }

      function helper(i = 0) {
        setTimeout(() => {
          if (i + 1 > userCount) {
            const report = `Completed ${i} of ${userCount}\nErrors: ${errors}`;
            return console.log(report);
          }

          const {screen_name, twitter_username} = users[i];
          const mergedParams = Object.assign(paramsJson, {
            screen_name: screen_name || twitter_username,
          });

          return Twitter({method, endpoint, params: mergedParams})
            .then((res) => {
              if (res.resp.statusCode !== 200) {
                console.log(`Error: statusCode ${res.resp.statusCode}\nData:`,
                  JSON.stringify(res, null, 4));
                errors++;
                return helper(i + 1);
              }
              console.log(`Completed ${i + 1} of ${userCount}`);
              console.log(`Successful Twitter call to ${endpoint}!`);

              if (i + 1 === 1000) {
                return console.warn('Stopped the Process at 1000 because you\'re in danger of max' +
                  'ing out the Twitter DM rate limit');
              }

              return helper(i + 1);
            })
            .catch((error) => {
              const report = `Completed ${i + 1} of ${userCount}\nErrors: ${errors}`;
              console.log(report);

              if (error.errors && error.errors[0].code === 88) {
                return console.warn(error.errors[0].message);
              }

              console.error('Error:', error);

              return helper(i + 1);
            });
        }, 1000);
      }

      console.log(`\n${userCount} users to message`);

      return helper();
    });
};
