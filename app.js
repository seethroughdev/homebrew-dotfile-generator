// requires
var _               = require('lodash'),
    Q               = require('q'),
    FS              = require('q-io/fs'),
    getArgv         = require('./helpers/parse-arg'),
    getLocalFiles   = require('./helpers/get-local-files'),
    startBrewFiles  = require('./helpers/parse-brew-files'),
    startCaskFiles  = require('./helpers/parse-cask-files'),
    brewTpl         = require('./templates/brew-template'),

    // paths
    brewPath        = '/usr/local/Cellar/',
    caskPath        = '/usr/local/Library/Taps/phinze-cask/Casks/'
    installAppDir   = getArgv(process.argv),

    // promises
    getLocalBrew    = FS.exists(brewPath),
    getCommonCasks  = FS.exists(caskPath),
    allComplete     = Q.all([getLocalBrew, getCommonCasks]);


getLocalBrew
  .then(function(bool) {
    return startBrewFiles()
  }, function(err) {
    callError(err);
  }).fin();

getCommonCasks
  .then(function(bool) {
    return startCaskFiles()
  }, function(err) {
    callError(err);
  }).fin();


// write brew file
FS.write(".brew", brewTpl()).fin();


allComplete.then(function() {
  console.log('Move to your home directory and simply type "brew bundle" to get started! ');
}).fin();

function callError(err) {
  console.error('ERROR: ' + err);
}
