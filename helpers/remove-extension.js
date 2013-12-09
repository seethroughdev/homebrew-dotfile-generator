module.exports = function(filename) {
  return filename.replace(/\.[^/.]+$/, "");
};
