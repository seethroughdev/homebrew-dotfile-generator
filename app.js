// requires
var _               = require('lodash'),
    Q               = require('q'),
    FS              = require('q-io/fs'),
    removeExtension = require('./helpers/remove-extension'),
    githubReqObj    = require('./helpers/github'),
    fileTemplate    = require('./helpers/file-template'),
    getArgv         = require('./helpers/parse-arg'),
    getLocalFiles   = require('./helpers/get-local-files'),
    getRemoteFiles  = require('./helpers/get-remote-files'),

    // params
    brewPath        = '/usr/local/Cellar',
    optPath         = '/opt/homebrew-cask/Caskroom/',
    appPath         = '/Applications',
    installAppDir   = getArgv(process.argv),

    // instantiate arrays
    localBrews      = [],
    brewFiles       = [],
    commonBrews     = [],
    optFiles        = [],
    appFiles        = [],
    allLocalCasks   = [],
    caskFiles       = [],
    commonCasks     = [];


// promises
var getLocalBrew    = getLocalFiles(brewPath),
    getGithubCask   = getRemoteFiles(githubReqObj.cask),
    getOptFiles     = getLocalFiles(optPath),
    getAppFiles     = getLocalFiles(appPath),
    gatherLocalApps = Q.all([getOptFiles, getAppFiles]),
    getCommonCasks  = Q.all([getGithubCask, gatherLocalApps]);


// get local brew formulae
getLocalBrew.then(function(files) {
  localBrews = files;
}).fin();


// get all local applications from Applications and /opt/
getOptFiles.then(function(files) {
  optFiles = files;
}).fin();

getAppFiles.then(function(files) {
  appFiles = files;
}).fin();


// merge File list from /Application and /opt/... before comparing
gatherLocalApps.done(function() {
  allLocalCasks = _.merge(optFiles, appFiles);
});


// get list of files from github object
getGithubCask.then(function(res) {
  _.forEach(res, function(val, i) {
    caskFiles.push(val.name);
  })
  return caskFiles;
}).then(function(files) {
  _.forEach(files, function(val, i) {
    caskFiles[i] = removeExtension(val);
  });
}).fin();


// find common files and feed them to file-template
getCommonCasks
  .then(function() {
    commonCasks = _.intersection(allLocalCasks, caskFiles).sort();
    return commonCasks;
  })
  .then(function(files) {
    var text = fileTemplate(files, installAppDir);
    return text;
  })
  .then(function(text) {
    FS.write(".cask", text).then(function() {
      console.log('Your file ".cask" has been written to the current directory!');
      console.log('Move to your home directory or simply type "sh .cask" to get started! ');
    });
  }).fin();
