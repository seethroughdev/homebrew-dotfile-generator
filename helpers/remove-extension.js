module.exports = function(filename) {
  // console.log(filename);
  return filename.replace(/\.[^/.]+$/, "");
};