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
    FS.exists('.Brewfile').then(function(exists) {
      if (exists) {
        console.log('* Brewfile already exists!  Type -f to overwrite or specify a path.');
      } else {
        FS.write('.Brewfile', text)
          .then(function() {
            console.log('- Brewfile was written to home...');
          });
      }
    });
  }, function(err) {
    callError(err);
  }).fin();


// return promise
module.exports = function (args) {
  return getLocalBrew;
};
