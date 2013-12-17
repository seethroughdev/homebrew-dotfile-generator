    // requires
var FS              = require('q-io/fs'),
    getLocalFiles   = require('./get-local-files'),
    brewFileTpl     = require('../templates/brew-file-template'),
    messaging       = require('./messaging'),

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
    FS.write('.Brewfile', text, 'wx')
      .then(function() {
        messaging.writeSuccess('.Brewfile');
      }, function() {
        messaging.exists('.Brewfile');
      }).fin();
  }, function(err) {
    callError(err);
  }).fin();


// return promise
module.exports = function (args) {
  return getLocalBrew;
};
