// requires
var _               = require('lodash'),
    FS              = require('q-io/fs'),

    getArgv         = require('./helpers/parse-arg'),
    messaging       = require('./helpers/messaging'),
    startBrewFiles  = require('./helpers/parse-brew-files'),
    brewTpl         = require('./templates/brew-template'),

    // paths
    brewPath        = '/usr/local/Cellar/',
    caskPath        = '/usr/local/Library/Taps/phinze-cask/Casks/'
    installAppDir   = getArgv(process.argv),

    // promises
    writeBrew       = FS.write('.brew', brewTpl(), 'wx'),
    getLocalBrew    = startBrewFiles(),
    getCommonCasks  = FS.exists(caskPath);


// write .brew
writeBrew
  .then(function() {
    messaging.writeSuccess('.brew');
  }, function(err) {
    messaging.exists('.brew');
  }).fin();


// get Casks if homebrew-cask is installed
getCommonCasks
  .then(function(exists) {

    if (!exists)
      return messaging.exists('brew-cask');

    var startCaskFiles  = require('./helpers/parse-cask-files');
    return startCaskFiles();

  })
  .fail(function(err) {
    messaging.writeFail('Caskfile');
  }).fin();


// write Brewfile
getLocalBrew
  .fail(function(err) {
    messaging.writeFail('Brewfile');
  }).fin();
