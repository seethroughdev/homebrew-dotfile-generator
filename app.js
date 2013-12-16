// requires
var _               = require('lodash'),
    FS              = require('q-io/fs'),
    getArgv         = require('./helpers/parse-arg'),
    startBrewFiles  = require('./helpers/parse-brew-files'),
    brewTpl         = require('./templates/brew-template'),

    // paths
    brewPath        = '/usr/local/Cellar/',
    caskPath        = '/usr/local/Library/Taps/phinze-cask/Casks/'
    installAppDir   = getArgv(process.argv),

    // promises
    writeBrew       = FS.exists('.brew'),
    getLocalBrew    = startBrewFiles(),
    getCommonCasks  = FS.exists(caskPath);



// write .brew
writeBrew
  .then(function(exists) {
    if (exists) {
      console.log('.brew already exists!\n* Type -f to overwrite it or specify a new path.');
    } else {
      FS.write('.brew', brewTpl())
        .then(function() {
          console.log('- .brew was written to home...');
        })
    }
  }).fin();



// get Casks if homebrew-cask is installed
getCommonCasks
  .then(function(exists) {

    if (!exists)
      return console.log('Looks like you don\'t have brew-cask installed.  You should consider it!');

    var startCaskFiles  = require('./helpers/parse-cask-files');
    return startCaskFiles();

  })
  .fail(function(err) {
    console.log('ERROR: Caskfile was not written!');
  }).fin();



// write Brewfile
getLocalBrew
  .fail(function(err) {
    console.log('ERROR: Brewfile was not written!', err);
  }).fin();
