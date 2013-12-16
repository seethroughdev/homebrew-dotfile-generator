// requires
var _               = require('lodash'),
    Q               = require('q'),
    FS              = require('q-io/fs'),
    getArgv         = require('./helpers/parse-arg'),
    getLocalFiles   = require('./helpers/get-local-files'),
    brewTpl         = require('./templates/brew-template'),
    caskFileTpl     = require('./templates/cask-file-template'),
    startBrewFiles  = require('./helpers/parse-brew-files'),

    // paths
    brewPath        = '/usr/local/Cellar/',
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
var getLocalBrew    = FS.exists(brewPath),
    getOptFiles     = getLocalFiles(optPath),
    getAppFiles     = getLocalFiles(appPath),
    getCaskList     = getLocalFiles(caskPath),
    gatherLocalApps = Q.all([getOptFiles, getAppFiles]),
    getCommonCasks  = Q.all([getCaskList, gatherLocalApps]),
    allComplete     = Q.all([getLocalBrew, getCommonCasks]);


getLocalBrew
  .then(function(bool) {
    return startBrewFiles()
  }, function(err) {
    callError(err);
  }).fin();


// write brew file
FS.write(".brew", brewTpl()).fin();


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
  }).fin();

allComplete.then(function() {
  console.log('Move to your home directory and simply type "brew bundle" to get started! ');
}).fin();

function callError(err) {
  console.error('ERROR: ' + err);
}
