// requires
var _               = require('lodash'),
    Q               = require('q'),
    FS              = require('q-io/fs'),
    getArgv         = require('./parse-arg'),
    getLocalFiles   = require('./get-local-files'),
    caskFileTpl     = require('../templates/cask-file-template'),

    // paths
    optPath         = '/opt/homebrew-cask/Caskroom/',
    appPath         = '/Applications',
    caskPath        = '/usr/local/Library/Taps/phinze-cask/Casks/'
    installAppDir   = getArgv(process.argv),

    // instantiate arrays
    optFiles        = [],
    appFiles        = [],
    allLocalCasks   = [],
    caskFiles       = [],
    commonCasks     = [];


// promises
var getOptFiles     = getLocalFiles(optPath),
    getAppFiles     = getLocalFiles(appPath),
    getCaskList     = getLocalFiles(caskPath),
    gatherLocalApps = Q.all([getOptFiles, getAppFiles]),
    getCommonCasks  = Q.all([getCaskList, gatherLocalApps]);


// get all local applications from Applications and /opt/
getOptFiles.then(function(files) {
  optFiles = files;
}, function(err) {
  callError(err);
}).fin();

getAppFiles.then(function(files) {
  appFiles = files;
}, function(err) {
  callError(err);
}).fin();


// merge File list from /Application and /opt/... before comparing
gatherLocalApps.done(function() {
  allLocalCasks = _.merge(optFiles, appFiles);
});


// get list of all casks
getCaskList.then(function(files) {
  caskFiles = files;
}, function(err) {
  callError(err);
}).fin();


// find common files and feed them to file-template
getCommonCasks
  .then(function() {
    commonCasks = _.intersection(allLocalCasks, caskFiles).sort();
    return commonCasks;
  })
  .then(function(files) {
    var text = caskFileTpl(files, installAppDir);
    return text;
  })
  .then(function(text) {
    FS.write(".Caskfile", text);
  }, function(err) {
    callError(err);
  })
  .then(function() {
    console.log('- Caskfile was written to home...');
  }).fin();


// return promise
module.exports = function (args) {
  return getCommonCasks;
};
