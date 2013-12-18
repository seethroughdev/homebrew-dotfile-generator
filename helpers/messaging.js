var getArgv = require('./parse-arg'),
    writePath = getArgv.p || 'the current folder';


var messaging = {
  exists: function(val) {
    return val + ' already exists!  Change path or add -f to force.';
  },
  writeSuccess: function(val) {
    return val + ' was written to ' + writePath;
  },
  notInstalled: function(val) {
    return 'Looks like you don\'t have ' + val + ' installed.  You should consider it!';
  },
  writeFail: function(val) {
    return 'ERROR: ' + val + ' was not written!';
  }
};

module.exports = messaging;
