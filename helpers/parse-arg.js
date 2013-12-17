var argv = require('optimist');

argv
  .options('f', {
    alias: 'force',
    usage: 'Allow overwriting of files.'
  })
  .options('a', {
    alias: 'app',
    usage: 'Add app directory tag to cask install'
  })
  .options('p', {
    alias: 'path',
    usage: 'Add path to install files',
    default: '~'
  });

module.exports = argv.argv;
