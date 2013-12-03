var request = require('request'),
    _ = require('lodash'),
    removeExtension = require('../helpers/remove-extension');


var githubUrl = 'https://api.github.com/',
  path = 'repos/phinze/homebrew-cask/contents/Casks',
  options = {
    url: githubUrl + path,
    headers: {
      'Accept': 'application/vnd.github.beta+json',
      'User-Agent': 'A test application for homebrew cask dotfile'
    }
  };

request.get(options, function(err, res, body) {
  if (err)
    return err;

  var caskList = [],
      json = JSON.parse(body),
      cask = "";

  _.forEach(json, function(val, key) {
    cask = removeExtension(val.name);
    caskList.push(cask);
  });

  module.exports = caskList;
});
