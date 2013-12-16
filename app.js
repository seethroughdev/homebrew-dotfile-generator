// requires
var _               = require('lodash'),
    Q               = require('q'),
    FS              = require('q-io/fs'),
    getArgv         = require('./helpers/parse-arg'),
    startBrewFiles  = require('./helpers/parse-brew-files'),
    startCaskFiles  = require('./helpers/parse-cask-files'),
    brewTpl         = require('./templates/brew-template'),

    // paths
    brewPath        = '/usr/local/Cellar/',
    caskPath        = '/usr/local/Library/Taps/phinze-cask/Casks/'
    installAppDir   = getArgv(process.argv),

    // promises
    getLocalBrew    = startBrewFiles(),
    getCommonCasks  = startCaskFiles(),
    writeBrew       = FS.write(".brew", brewTpl()),
    allComplete     = Q.all([getLocalBrew, getCommonCasks, writeBrew]);


// complete promises
getLocalBrew
  .fail(function(err) {
    console.log('ERROR: Brewfile was not written!', err);
  }).fin();

getCommonCasks
  .fail(function(err) {
    console.log('ERROR: Caskfile was not written!', err);
  }).fin();

writeBrew
  .fail(function(err) {
    console.log('ERROR: .brew file was not written!', err);
  }).fin();

// onComplete
allComplete.then(function() {
  console.log('Move to your home directory and simply type "brew bundle" to get started! ');
}).fin();
