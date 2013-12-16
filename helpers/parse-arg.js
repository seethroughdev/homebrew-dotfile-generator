var _ = require('lodash'),
    FS = require('q-io/fs');

var argv = {
  force: false,
  appFolder: false,
  path: false
};

function setArgs(args) {
  if (args.indexOf('-a') !== -1) {
    argv.appFolder = true;
  };

  if (args.indexOf('-f') !== -1) {
    argv.force = true;
  }

  _.forEach(args, function(val, i) {
    FS.isDirectory(val)
      .then(function(exists) {
        if (exists !== true)
          return

        argv.path = val;
    })
  });

}

module.exports = function (args) {

  setArgs(args);
  return argv;

};
