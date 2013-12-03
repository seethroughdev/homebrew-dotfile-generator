// requires
var _       = require('lodash'),
    requestify = require('requestify'),
    removeExtension = require('./helpers/remove-extension');

// params
var path = process.argv[2],
    githubUrl = 'https://api.github.com/repos/phinze/homebrew-cask/contents/Casks';

var options = {
  headers: {
    'Accept': 'application/vnd.github.beta+json',
    'User-Agent': 'A test application for homebrew cask dotfile'
  }
};

var cask = "",
    caskList = [];

requestify.get(githubUrl, options)
  .then(function(res) {

    return res.getBody();

  }).then(function(res) {

    _.forEach(res, function(val, key) {
      cask = removeExtension(val.name);
      caskList.push(cask);
    });
    return caskList;

  }).then(function(caskList) {

    console.log(caskList);

  }, function(err) {
    console.log('ERROR: ' + err);
  });