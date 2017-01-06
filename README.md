# Growth Tools
Growth Tools is a collection of scripts that can be used to launch scrappy growth experiments.

## Required Tools
- [NVM](https://github.com/creationix/nvm)

Install NodeJS with 'nvm`:

```bash
nvm install
```

Install `yarn` for package management with:

```bash
npm install -g yarn
```

## Install
Checkout the source code and in the root directory run:

```bash
yarn install
```

## API Keys
The Growth Tool scripts require API keys from the following platforms:

- [Product Hunt](https://api.producthunt.com/v1/docs)
- [FullContact](https://www.fullcontact.com/developer/)
- [Twitter](https://apps.twitter.com/)

You may want to put these secrets in your `.bash_profile` or another appropriate `source` executable so you don't always have to set them, eg:

```bash
export PRODUCT_HUNT_CLIENT_ID=<Insert Client Id>
export PRODUCT_HUNT_CLIENT_SECRET=<Insert Client Secret>

export FULLCONTACT_API_KEY=<Insert API Key>

export TWITTER_API_KEY=<Insert API Key>
export TWITTER_API_SECRET=<Insert API Secret>
export TWITTER_ACCESS_TOKEN=<Insert Access Token>
export TWITTER_ACCESS_TOKEN_SECRET=<Insert Access Token Secret>
```

## Running
To use the scripts, in the root directory, run something like this:

```bash
node . <command> <options>
```

If you need help you can enter:

```bash
# Get a list of available commands
node . --help

# Get help for a specific command
node . <command> --help
```

Results will export to a file in the `./exports` directory.