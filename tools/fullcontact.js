const fs = require('fs');

const {GetPerson} = require('./util/fullcontact-service.js');

exports.command = 'fullcontact';
exports.description = 'Get contact information with the FullContact API';
exports.builder = (yargs) =>
  yargs
    .usage('Usage: $0 fullcontact <option>')
    .option('method', {
      alias: 'm',
      describe: 'The method to look up the user',
      choices: ['email', 'twitter', 'phone'],
      required: true,
      type: 'string',
    })
    .option('user', {
      alias: 'u',
      describe: 'A user\'s email address, Twitter handle, or phone number',
      required: true,
      type: 'string',
    })
    .option('filename', {
      alias: 'f',
      describe: 'Save the results with the filename',
      required: false,
      type: 'string',
    })
    .example('$0 fullcontact -m twitter -u helloBrent -f foo', 'Get the fullcontact for the user');

exports.handler = (argv) => (
  GetPerson(argv)
    .then((res) => {
      const {filename, user} = argv;
      const fileLocation = `./exports/${filename || user}.json`;

      fs.writeFile(fileLocation, JSON.stringify(res, null, 4));
      console.log(`Exported results to: ${fileLocation}`);
    })
    .catch((err) => {
      console.log('Error:', err);
    })
);
