var HTTP            = require('q-io/http');

module.exports = function (obj) {
  return HTTP.request(obj).then(function(res) {
    return res.body.read()
  }).then(function(res) {
    return res.toString();
  }).then(function(res) {
    return JSON.parse(res);
  })
};
