# Universal Keymap

## IDEs

### Global

| Key | Action
| --- | --- |
| ESC       | Return to last, until back to text editor window.

### Text editor / Tabs

| Key | Action
| --- | --- |
| CTRL-D    | Duplicate line, and move caret down with it.
| CTRL-E    | Navigate to previous file. Pressing enter immediately should switch to the last one. Arrow keys to select.
| CTRL-L    | Focus file in project/solution explorer.



## Karabiner

### Karabiner Event Viewer

Will reveal key codes of presses and BundleIDs of applications for filtering.

### Goku

https://github.com/yqrashawn/GokuRakuJoudo

A live editor for karabiner's `~/.config/karabiner/karabiner.json`.

You edit a `~/.config/karabiner.edn` file, and it translates those commands into `karabiner.json`.

It will watch `karabiner.edn` for changes and update `karabiner.json` automatically.

Install goku with `brew install yqrashawn/goku/goku`.

Run goku automatically in the background with: `brew services start goku`.

EDN is a shorthand language for defining complex key mappings in karabiner.

There's a cheatsheet for its syntax here:
https://github.com/yqrashawn/GokuRakuJoudo/blob/master/resources/configurations/edn/example.edn