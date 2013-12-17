## Homebrew Dotfile Generator

You can run helpful homebrew scripts from dotfiles.

This mini node app will generate 3 files for you:

- a **.brew file** for running standard homebrew actions
- a **.Brewfile** which uses the new `brew bundle` feature to store a list
of formulae for re-installing
- a **.Caskfile** for [homebrew-cask](https://github.com/phinze/homebrew-cask).  Which also uses the new `brew bundle` feature.  This will load casks in the same way that the .Brewfile will load formulae

**Homebrew Dotfile Generator** will actually scan all of your installed homebrew formulae and create the .Brewfile script for use with brew bundle.

And it will also scan all of your local Applications and installed brew-casks, and compare them with a list of all available casks to create a customized .Caskfile.

I find it pretty useful.


See an example [here](https://gist.github.com/seethroughtrees/7902470);

This app will check all of the Applications in your `/Applications`
folder and any Casks you already have installed in your
`/opt/homebrew-cask/Caskroom/`.

Then compare them to a list of current Casks in the homebrew-cask
Github Repo.

Lastly, it will generate a .cask file that is a shell script for
syncing and automating your installs across devices.


### Installation

*this is not implemented yet*

```npm install brew-cask-dotfile```


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

