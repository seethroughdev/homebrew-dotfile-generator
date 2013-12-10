## Brew Cask Dotfile Generator

If you use [homebrew-cask](https://github.com/phinze/homebrew-cask)
to install applications, you can use a dotfile to keep your apps
consistent across your devices.

This app will check all of your the apps in your `/Applications`
folder and any Casks you already have in your
`/opt/homebrew-cask/Caskroom/`.

Then compare them to a list of current Casks in the homebrew-cask
Github Repo.

Lastly, it will generate a .cask file that is a shell script for
syncing and automating your installs across devices.


### Installation

```npm install brew-cask-dotfile```


### Usage

Just type `node app` to generate your script file.

It will generate the .cask file in the current directory.  Move it to
your home directory after to keep it organized.

After you have the file, just run `sh ~/.cask` to run the script!


### Options

##### Specify Path

By default, Brew Cask Dotfile Generator will generate the .cask file in
the current directory.  If you want to specify a separate directory
(like your home directory for instance), you can just add the path:

```
node app ~
```

##### Set Applications Flag

In homebrew-cask you can have your applications install directly into
the /Applications folder if you want by passing an option.

With brew-cask-dotile you can add the option to your script by adding
the argument `-a` after.

So you would now do enter `node app -a`

