/* eslint-disable no-unused-expressions  */

/**
 * this is the root for a series of commands. Run this file in node and choose
 * subcommands. Ex:
 *
 * $ node index.js
 * Commands:
 *   producthunt
 *   fullcontact
 * ...
 *
 * $ node . <command> <options>
 */
require('yargs')
  .commandDir('tools')
  .demand(1, 'You need at least one command before moving on')
  .help('help')
  .argv;
