// requires
var _               = require('lodash'),
    Q               = require('q'),
    FS              = require('q-io/fs'),
    getArgv         = require('./parse-arg'),
    getLocalFiles   = require('./get-local-files'),
    caskFileTpl     = require('../templates/cask-file-template'),
    messaging       = require('./messaging'),

    // flags
    overwriteFiles  = getArgv.f ? 'w' : 'wx',
    addAppPath      = getArgv.a,

    // paths
    optPath         = '/opt/homebrew-cask/Caskroom/',
    appPath         = '/Applications',
    caskPath        = '/usr/local/Library/Taps/phinze-cask/Casks/',

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
getOptFiles
  .then(function(files) {
    optFiles = files;
  }).fin();

getAppFiles
  .then(function(files) {
    appFiles = files;
  }).fin();


// merge File list from /Application and /opt/... before comparing
gatherLocalApps.done(function() {
  allLocalCasks = _.merge(optFiles, appFiles);
});


// get list of all casks
getCaskList
  .then(function(files) {
    caskFiles = files;
  }).fin();


// find common files and feed them to file-template
getCommonCasks
  .then(function() {
    commonCasks = _.intersection(allLocalCasks, caskFiles).sort();
    return commonCasks;
  })
  .then(function(files) {
    var text = caskFileTpl(files, addAppPath);
    return text;
  })
  .then(function(text) {
    FS.write('.Caskfile', text, overwriteFiles)
      .then(function() {
        messaging.writeSuccess('.Caskfile');
      }, function() {
        messaging.exists('.Caskfile');
      });
  }).fin();


// return promise
module.exports = function () {
  return getCommonCasks;
};
