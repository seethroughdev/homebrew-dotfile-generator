var parseArgs = {
  getAppFlag: function(args) {
    var flag = args.indexOf('-a'.toLowerCase());

    if (flag !== -1) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = parseArgs;
