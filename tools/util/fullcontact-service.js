const FullContact = require('fullcontact');

const fullcontact = new FullContact(process.env.FULLCONTACT_API_KEY);

function GetPerson({method, user}) {
  return new Promise((resolve, reject) => {
    console.log(`Getting fullcontact for ${user}`);

    if (method) {
      fullcontact.person[method](user, fullcontactCallback);
    } else {
      resolve();
    }

    function fullcontactCallback(err, data) {
      if (err) {
        return reject(err);
      }

      return resolve(data);
    }
  });
}

module.exports = {
  GetPerson,
};
