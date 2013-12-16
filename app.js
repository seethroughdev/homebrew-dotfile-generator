// requires
var _               = require('lodash'),
    Q               = require('q'),
    FS              = require('q-io/fs'),
    getArgv         = require('./helpers/parse-arg'),
    startBrewFiles  = require('./helpers/parse-brew-files'),
    brewTpl         = require('./templates/brew-template'),

    // paths
    brewPath        = '/usr/local/Cellar/',
    caskPath        = '/usr/local/Library/Taps/phinze-cask/Casks/'
    installAppDir   = getArgv(process.argv),

    // promises
    getLocalBrew    = startBrewFiles(),
    writeBrew       = FS.write(".brew", brewTpl()),
    allComplete     = Q.all([getLocalBrew, getCommonCasks, writeBrew]);


var getCommonCasks;


// get Casks if homebrew-cask is installed
FS.exists(caskPath)
  .then(function(exists) {

    if (!exists)
      return console.log('Looks like you don\'t have brew-cask installed.  You should consider it!');

    var startCaskFiles  = require('./helpers/parse-cask-files');

    getCommonCasks  = startCaskFiles();

    getCommonCasks
      .fail(function(err) {
        console.log('ERROR: Caskfile was not written!');
      }).fin();
  });


// complete promises
getLocalBrew
  .fail(function(err) {
    console.log('ERROR: Brewfile was not written!', err);
  }).fin();


writeBrew
  .then(function() {
    console.log('- .brew file was written to home...');
  })
  .fail(function(err) {
    console.log('ERROR: .brew file was not written!', err);
  }).fin();

// onComplete
allComplete.then(function() {
  console.log('Homebrew dotfiles were generated!');
}).fin();
