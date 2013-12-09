module.exports = function (args) {
  var len = args.length - 1;

  if (args[len] === '-A') {
    return true;
  } else {
    return false;
  }

};
