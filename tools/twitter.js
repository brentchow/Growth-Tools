// const TwitterMap = require('./util/twitter-map.js');
const {TwitterPost} = require('./util/twitter-service.js');

exports.command = 'twitter';
exports.description = 'Various collection of Twitter tools';
exports.builder = (yargs) =>
  yargs
    .usage('Usage: $0 twitter <command> <options>')
    .option('endpoint', {
      alias: 'e',
      describe: 'The Twitter API endpoint to use',
      required: true,
      type: 'string',
      options: ['direct_messages/new'],
    })
    .option('screen_name', {
      alias: ['s', 'handle', 'h'],
      describe: 'The recipient\'s Twitter handle',
      required: true,
      type: 'string',
    })
    .option('text', {
      alias: ['t', 'message', 'm'],
      describe: 'The message to be posted',
      required: true,
      type: 'string',
    })
    .example('$0 twitter -e direct_messages/new -s helloBrent -t \'foo bar\'',
      'Send helloBrent a direct message on Twitter');

exports.handler = (argv) => {
  const {endpoint, screen_name, text} = argv;

  const options = {
    screen_name,
    text,
  };

  return TwitterPost(endpoint, options);
};

