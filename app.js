// requires
var _               = require('lodash'),
    Q               = require('q'),
    FS              = require('q-io/fs'),
    HTTP            = require('q-io/http'),
    removeExtension = require('./helpers/remove-extension'),
    parameterize    = require('./helpers/parameterize'),
    githubReqObj    = require('./helpers/github'),
    fileTemplate    = require('./helpers/file-template'),

    // params
    localPath       = '/opt/homebrew-cask/Caskroom/',
    appPath         = '/Applications',

    // main arrays
    localFiles      = [],
    appFiles        = [],
    allLocalFiles   = [],
    caskFiles       = [],
    commonFiles     = [];


// promises
var getGithubFiles  = HTTP.request(githubReqObj);
var getLocalFiles   = FS.list(localPath);
var getAppFiles     = FS.list(appPath);
var getCommonFiles  = function() {
  Q.all([getGithubFiles, gatherLocalApps])
    .then(function() {
      commonFiles = _.intersection(allLocalFiles, caskFiles).sort();
      return commonFiles;
    })
    .then(function(files) {
      var text = fileTemplate(files);
      return text;
    })
    .then(function(text) {
      console.log('Writing .cask file to current directory...');
      return text;
    })
    .then(function(text) {
      FS.write(".cask", text).then(function() {
        console.log('Your file (.cask) has been written to the current directory!');
        console.log('Simply type "sh .cask" to get started! ');
      });
    }).fin();

};


// get File list from Brew Cask Github files list
getGithubFiles
  .then(function(res) {
    console.log('Loading Cask Files list...');
    return res;
  })
  .then(function(res) {
    res.body.read()
      .then(function(res) {
        return JSON.parse(res);
      })
      .then(function(res) {
        _.forEach(res, function(val, i) {
          caskFiles.push(val.name);
        });
      })
      .then(function() {
        _.forEach(caskFiles, function(val, i) {
          caskFiles[i] = removeExtension(val);
        });
      })
      .then(function() {
        getCommonFiles();
      }).fin();
  }, function() {
    console.log('ERROR: Cask Files could not be retreived!');
  }).fin();


// get File list from /opt/homebrew-cask/Caskroom/
getLocalFiles
  .then(function(files) {
    console.log('Loading Local Files from Caskroom...');
    return files;
  })
  .then(function(files) {
    _.forEach(files, function(val, i) {
      val = removeExtension(val);
      val = parameterize(val);
      localFiles.push(val);
    });
    return files;
  }, function() {
    console.log('ERROR: Local Cask Files could not be retrieved!');
  }).fin();


// Get File list from /Applications
getAppFiles
  .then(function(files) {
    console.log('Loading Local Files from Applications directory...');
    return files;
  })
  .then(function(files) {
    _.forEach(files, function(val, i) {
      val = removeExtension(val);
      val = parameterize(val);
      appFiles.push(val);
    });
    return files;
  }, function() {
    console.log('ERROR: Local App Files could not be retrieved!');
  }).fin();


// merge File list from /Application and /opt/... before comparing
var gatherLocalApps = Q.all([getLocalFiles, getAppFiles]).done(function() {
  allLocalFiles = _.merge(localFiles, appFiles);
});
