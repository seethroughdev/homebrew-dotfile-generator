// requires
var _           = require('lodash'),
    requestify  = require('requestify'),
    fs          = require('fs'),
    Q           = require("q"),
    removeExtension = require('./helpers/remove-extension'),
    parameterize = require('./helpers/parameterize');

// params
var path = process.argv[2] || "/Applications",
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

    // console.log(caskList);

  }, function(err) {
    console.log('ERROR: ' + err);
  });

fs.readdir(path, function(err, files) {
  if (err)
    return err;

  _.forEach(files, function(val, index) {
    val = removeExtension(val);
    val = parameterize(val);
    files[index] = val;
  })

  console.log(files);
})
