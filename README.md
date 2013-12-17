## Homebrew Dotfile Generator

You can run helpful homebrew scripts from dotfiles.

This mini app will scan all of your brew formulae, brew-casks and locally installed Applications, and generate 3 homebrew dotfiles.  It creates:

- a **.brew file** for running standard homebrew actions
- a **.Brewfile** which uses the new `brew bundle` feature to store a list
of formulae for re-installing
- a **.Caskfile** for [homebrew-cask](https://github.com/phinze/homebrew-cask).  Which also uses the new `brew bundle` feature.  This will load casks in the same way that the .Brewfile will load formulae

### Examples

- [.brew]() example
- [.Brewfile]() example
- [.Caskfile]() example


### Installation

```
  git clone https://github.com/seethroughtrees/homebrew-dotfile-generator.git
  cd homebrew-dotfile-generator
  npm install
  node app

```




### Usage

Just type `node app` to generate your script file.

It will generate the .cask file in the current directory.  Move it to
your home directory after to keep it organized.

After you have the file, just run `sh ~/.cask` to run the script!


### Options

##### Set Applications Flag

In homebrew-cask you can have your applications install directly into
the /Applications folder if you want by passing an option.

With brew-cask-dotile you can add the option to your script by adding
the argument `-a` after.

```node app -a```


### Contributing

Feel like making this better?  Great.  Please just add tests to any changes.
You can run the tests with `npm test`.

They're written with [testem](https://github.com/airportyh/testem),
[Mocha](http://visionmedia.github.io/mocha/) and [Chai](http://chaijs.com/).

