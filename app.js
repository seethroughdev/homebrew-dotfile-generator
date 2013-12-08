// requires
var _               = require('lodash'),
    Q               = require('q'),
    FS              = require('q-io/fs'),
    HTTP            = require('q-io/http'),
    removeExtension = require('./helpers/remove-extension'),
    parameterize    = require('./helpers/parameterize'),

    // params
    localPath       = '/opt/homebrew-cask/Caskroom/',
    appPath         = '/Applications',

    // main arrays
    localFiles      = [],
    appFiles        = [],
    allLocalFiles   = [],
    caskFiles       = [],
    commonFiles     = [],

    requestObj      = {
      url: 'https://api.github.com/repos/phinze/homebrew-cask/contents/Casks',
      method: 'GET',
      headers: {
        'Accept': 'application/vnd.github.beta+json',
        'User-Agent': 'A test application for homebrew cask dotfile'
      }
    };


// promises
var getGithubFiles  = HTTP.request(requestObj);
var getLocalFiles   = FS.list(localPath);
var getAppFiles     = FS.list(appPath);
var getCommonFiles  = function() {
  Q.all([getGithubFiles, gatherLocalApps]).done(function() {
    commonFiles = _.intersection(appFiles, caskFiles).sort();
    console.log(commonFiles);
  })
};


// get File list from Brew Cask Github files list
getGithubFiles
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
