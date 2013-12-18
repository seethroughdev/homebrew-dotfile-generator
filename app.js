// requires
var FS              = require('q-io/fs'),

    getArgv         = require('./helpers/parse-arg'),
    messaging       = require('./helpers/messaging'),
    startBrewFiles  = require('./modules/parse-brew-files'),
    brewTpl         = require('./templates/brew-template'),

    // paths
    caskPath        = '/usr/local/Library/Taps/phinze-cask/Casks/',

    // set by args
    overwriteFiles  = getArgv.f ? 'w' : 'wx',
    writePath       = getArgv.p || '.',

    // promises
    writeBrew       = FS.write(writePath + '/.brew', brewTpl(), overwriteFiles),
    getLocalBrew    = startBrewFiles(),
    getCommonCasks  = FS.exists(caskPath);


// write .brew
writeBrew
  .then(function() {
    console.log(messaging.writeSuccess('.brew'));
  }, function() {
    console.log(messaging.exists('.brew'));
  }).fin();


// get Casks if homebrew-cask is installed
getCommonCasks
  .then(function(exists) {

    if (!exists)
      return console.log(messaging.exists('brew-cask'));

    var startCaskFiles  = require('./modules/parse-cask-files');
    return startCaskFiles();

  })
  .fail(function(err) {
    console.log(messaging.writeFail('Caskfile'));
    console.log(err);
  }).fin();


// write Brewfile
getLocalBrew
  .fail(function(err) {
    console.log(messaging.writeFail('Brewfile'));
    console.log(err);
  }).fin();
