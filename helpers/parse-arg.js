module.exports = function (args) {
  var len = args.length - 1;

  if (args[len].toLowerCase() === '-a') {
    return true;
  } else {
    return false;
  }

};
