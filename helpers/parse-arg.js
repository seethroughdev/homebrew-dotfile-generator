var argv = require('optimist');

argv
  .options('f', {
    alias: 'force',
    usage: 'Allow overwriting of files.'
  })

module.exports = argv.argv;
