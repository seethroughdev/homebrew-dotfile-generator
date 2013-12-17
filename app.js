// requires
var FS              = require('q-io/fs'),

    getArgv         = require('./helpers/parse-arg'),
    messaging       = require('./helpers/messaging'),
    startBrewFiles  = require('./helpers/parse-brew-files'),
    brewTpl         = require('./templates/brew-template'),

    // paths
    caskPath        = '/usr/local/Library/Taps/phinze-cask/Casks/',

    // flags
    overwriteFiles  = getArgv.f ? 'w' : 'wx',

    // promises
    writeBrew       = FS.write('.brew', brewTpl(), overwriteFiles),
    getLocalBrew    = startBrewFiles(),
    getCommonCasks  = FS.exists(caskPath);


// write .brew
writeBrew
  .then(function() {
    messaging.writeSuccess('.brew');
  }, function() {
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
    console.log(err);
  }).fin();


// write Brewfile
getLocalBrew
  .fail(function(err) {
    messaging.writeFail('Brewfile');
    console.log(err);
  }).fin();
