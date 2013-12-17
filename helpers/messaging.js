var messaging = {
  exists: function(val) {
    return console.log(val + ' already exists!  Change path or add -f to force');
  },
  writeSuccess: function(val) {
    return console.log(val + ' was written to home...');
  },
  notInstalled: function(val) {
    return console.log('Looks like you don\'t have ' + val + ' installed.  You should consider it!');
  },
  writeFail: function(val) {
    return console.log('ERROR: ' + val + ' was not written!');
  }
};

module.exports = messaging;
