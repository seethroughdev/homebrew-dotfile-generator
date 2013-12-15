var req = {

  cask: {
    url: 'https://api.github.com/repos/phinze/homebrew-cask/contents/Casks',
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github.beta+json',
      'User-Agent': 'A test application for homebrew cask dotfile'
    }
  },
  brew: {
    url: 'https://api.github.com/repos/Homebrew/homebrew/contents/Library/Formula',
    method: 'GET',
    headers: {
      'Accept': 'application/vnd.github.beta+json',
      'User-Agent': 'A test application for homebrew cask dotfile'
    }
  }
};

module.exports = req;
