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
    optPath       = '/opt/homebrew-cask/Caskroom/',
    appPath         = '/Applications',
    installAppDir   = getArgv(process.argv),

    // instantiate arrays
    optFiles        = [],
    appFiles        = [],
    allLocalFiles   = [],
    caskFiles       = [],
    commonFiles     = [];


// promises
var getGithubFiles  = getRemoteFiles(githubReqObj);
var getOptFiles     = getLocalFiles(optPath);
var getAppFiles     = getLocalFiles(appPath);
var gatherLocalApps = Q.all([getOptFiles, getAppFiles]);
var getCommonFiles  = Q.all([getGithubFiles, gatherLocalApps]);

// get all local applications from Applications and /opt/
getOptFiles.then(function(files) {
  optFiles = files;
}).fin();

getAppFiles.then(function(files) {
  appFiles = files;
}).fin();

// merge File list from /Application and /opt/... before comparing
gatherLocalApps.done(function() {
  allLocalFiles = _.merge(optFiles, appFiles);
});

// get list of files from github object
getGithubFiles.then(function(res) {
  _.forEach(res, function(val, i) {
    caskFiles.push(val.name);
  })
  return caskFiles;
}).then(function(files) {
  _.forEach(files, function(val, i) {
    caskFiles[i] = removeExtension(val);
  });
  return caskFiles;
}).fin();


getCommonFiles
  .then(function() {
    commonFiles = _.intersection(allLocalFiles, caskFiles).sort();
    return commonFiles;
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
