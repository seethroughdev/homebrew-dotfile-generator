    // requires
var FS              = require('q-io/fs'),
    getLocalFiles   = require('../helpers/get-local-files'),
    getArgv         = require('../helpers/parse-arg'),
    brewFileTpl     = require('../templates/brew-file-template'),
    messaging       = require('../helpers/messaging'),

    // flags
    overwriteFiles  = getArgv.f ? 'w' : 'wx',
    writePath       = getArgv.p || '.',

    // paths
    brewPath        = '/usr/local/Cellar/',

    // promises
    getLocalBrew    = getLocalFiles(brewPath);


// get local brew formulae
getLocalBrew.then(function(files) {
    var text = brewFileTpl(files);
    return text;
  })
  .then(function(text) {
    FS.write(writePath + '/.Brewfile', text, overwriteFiles)
      .then(function() {
        messaging.writeSuccess('.Brewfile');
      }, function() {
        messaging.exists('.Brewfile');
      }).fin();
  }, function(err) {
    console.log(err);
  }).fin();


// return promise
module.exports = function () {
  return getLocalBrew;
};
