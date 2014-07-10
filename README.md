## Homebrew Dotfile Generator

You can run homebrew scripts from dotfiles.

This mini app will scan all of your brew formulae, brew-casks and locally installed Applications, and generate **3 custom homebrew dotfiles**.  It creates:

- a **.brew** file for running standard homebrew actions
- a **Brewfile** which uses the new `brew bundle` feature to store a list
of formulae for re-installing
- a **Caskfile** for [homebrew-cask](https://github.com/phinze/homebrew-cask).  Which also uses the new `brew bundle` feature.  This will load casks in the same way that the Brewfile will load formulae

### Examples

Here's an example of each generated file:

- [.brew](https://gist.github.com/seethroughtrees/8010256) example
- [Brewfile](https://gist.github.com/seethroughtrees/8010281) example
- [Caskfile](https://gist.github.com/seethroughtrees/8010303) example


### Installation

This assumes you have [homebrew](http://brew.sh/) installed.  If you don't.  That's a good
place to start.

```
  npm install -g git://github.com/seethroughtrees/homebrew-dotfile-generator.git
```


### Usage

Make sure your homebrew is up to date.

```
brew update
```

Then just type `node app` to generate your script files.

```
node app
```

### Options

##### Specify Path

By default, the files will be generated in the current directory.  But you can
specify an install directory (like your home directory) with the `-p` flag.

```
node app -p ~/Desktop
```

##### Force Option

Also, the files will not overwrite automatically.  I did this as a safety
precaution.  If you want to overwrite, just pass the `-f` flag.

```
node app -f
```

##### Set Homebrew-Cask directory

[Homebrew-Cask](https://github.com/phinze/homebrew-cask) gives you the option
to specify the /Applications directory if you want to install your casks
directly into that folder.  If you pass the `-a` flag, Homebrew Dotfile Generator will add the `--appdir` flag directly into your script.

```
node app -a
```

### Using your dotfiles

You can use the **.brew** file by running it as a shell script in your terminal.

```
sh ~/.brew
```

Run your **Brewfile** by using the new [brew bundle command](https://github.com/Homebrew/homebrew/pull/24107).

```
brew bundle /pathto/Brewfile
```

Run your **CaskFile** the same way:

```
brew bundle /pathto/CaskFile
```


### Helpful Links

- [Homebrew discussion](https://github.com/Homebrew/homebrew/pull/24107) re: Brewfile and Brew bundle
- [How to use Brewfiles](https://coderwall.com/p/afmnbq) a good insight by Patrick Stadler


### Contributing

Feel like making this better?  Great.  Please just add tests to any changes.
You can run the tests with `npm test`.

They're written with [testem](https://github.com/airportyh/testem),
[Mocha](http://visionmedia.github.io/mocha/) and [Chai](http://chaijs.com/).

Send any pull-requests to the `incoming` branch please.

