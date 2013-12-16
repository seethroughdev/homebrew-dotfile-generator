    // requires
var FS              = require('q-io/fs'),
    getLocalFiles   = require('./get-local-files'),
    brewFileTpl     = require('../templates/brew-file-template'),

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
    FS.write('.Brewfile', text);
  }, function(err) {
    callError(err);
  }).fin();


// return promise
module.exports = function (args) {
  return getLocalBrew;
};
