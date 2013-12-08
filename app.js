// requires
var _               = require('lodash'),
    Q               = require('q'),
    FS              = require('q-io/fs'),
    HTTP            = require('q-io/http'),
    removeExtension = require('./helpers/remove-extension'),
    parameterize    = require('./helpers/parameterize'),

    // params
    path            = process.argv[2] || "/Applications",

    // main arrays
    localFiles      = [],
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
var getLocalFiles   = FS.list(path);
var getCommonFiles = function() {
  Q.all([getGithubFiles, getLocalFiles]).done(function() {
    commonFiles = _.intersection(localFiles, caskFiles).sort();
    console.log(commonFiles);
  })
};


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
      });
  }, function() {
    console.log('ERROR: Cask Files could not be retreived!');
  }).fin();


getLocalFiles
  .then(function(files) {
    _.forEach(files, function(val, i) {
      val = removeExtension(val);
      val = parameterize(val);
      localFiles.push(val);
    });
    return files;
  }, function() {
    console.log('ERROR: Local Files could not be retrieved!');
  }).fin();

