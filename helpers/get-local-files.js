var FS              = require('q-io/fs'),
    _               = require('lodash'),
    removeExtension = require('./remove-extension'),
    parameterize    = require('./parameterize');

module.exports = function (path) {

  var getFiles = FS.list(path);

  getFiles
    .then(function(files) {
      _.forEach(files, function(val, i) {
        val = removeExtension(val);
        val = parameterize(val);
        files[i] = val;
      });
      return files;
    }, function() {
      console.log('ERROR: ' + path + ' files could not be retrieved!');
    });

  return getFiles;

};
