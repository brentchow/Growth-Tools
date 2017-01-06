/* eslint-disable camelcase */
const ProductHuntAPI = require('producthunt');
const csvWriter = require('csv-write-stream');
const fs = require('fs');

// const {GetPerson} = require('./util/fullcontact-service.js');

const productHunt = new ProductHuntAPI({
  client_id: process.env.PRODUCT_HUNT_CLIENT_ID,
  client_secret: process.env.PRODUCT_HUNT_CLIENT_SECRET,
  grant_type: 'client_credentials',
});

exports.command = 'producthunt';
exports.description = 'A tool to get the voter information for a product on Product Hunt.';
exports.builder = (yargs) =>
  yargs
    .usage('Usage: $0 producthunt <options>')
    .option('url', {
      alias: 'u',
      describe: 'The post\'s URL that was used to post on Product Hunt',
      required: true,
      type: 'string',
    })
    .option('filename', {
      alias: 'f',
      describe: 'Save the results with the filename',
      required: false,
      type: 'string',
    })
    .example('$0 producthunt --url https://example.com -f foo',
      'Get the voter information for a product on Product Hunt. Results are exported into a CSV.');

exports.handler = (argv) => {
  if (!argv.url) {
    return console.log('No valid option provided.\nTo see available options use:\n\nproducthunt ' +
      '--help');
  }

  return getPostsByUrl(argv);
};

function getPostsByUrl({url, filename}) {
  productHunt.posts.all({params: {search: {url}}}, (err, res) => {
    if (err) {
      return console.log('\nError productHunt.posts.all()', err);
    }

    const {posts} = JSON.parse(res.body);

    if (posts.length === 0) {
      return console.log(`\nNo posts were found with the url ${url}`);
    }

    return posts.forEach((post) => (
      getVotes(post)
        .then((votes) => {
          const fileLocation = `./exports/${filename || post.name}.csv`;
          const writer = csvWriter({
            headers: [
              'id',
              'username',
              'name',
              'twitter_username',
              // 'email',
              'website_url',
              'profile_url',
            ],
          });

          writer.pipe(fs.createWriteStream(fileLocation));

          votes.forEach((vote) => {
            const {id, username, name, twitter_username, website_url, profile_url} = vote.user;
            // const {email} = GetPerson({twitter: twitter_username});

            writer.write([
              id,
              username,
              name,
              twitter_username,
              // email,
              website_url,
              profile_url,
            ]);
          });

          writer.end();
          console.log(`Exported results to: ${fileLocation}`);
        })
        .catch((error) => {
          console.log(error);
        })
    ));
  });
}

function getVotes({name, id, votes_count}) {
  return new Promise((resolve, reject) => {
    function helper(lastId, collectedVotes = []) {
      console.log(`Completed ${collectedVotes.length} of ${votes_count}`);

      if (collectedVotes.length >= votes_count) {
        return resolve(collectedVotes);
      }

      const older = parseInt(lastId, 10) || {};
      const params = Object.assign({per_page: 50}, {older});

      return productHunt.votes.index({post_id: id, params}, (err, res) => {
        if (err) {
          return reject(`\nError productHunt.votes.index() ${err}`);
        }

        const {votes} = JSON.parse(res.body);

        if (votes.length === 0) {
          return reject(`Error: Only ${collectedVotes.length} of ${votes_count} votes returned`);
        }

        collectedVotes.push(...votes);

        const lastVote = collectedVotes[collectedVotes.length - 1];

        return helper(lastVote.id, collectedVotes);
      });
    }

    console.log(`\n${votes_count} votes for ${name} (ID: ${id})`);

    return helper();
  });
}
