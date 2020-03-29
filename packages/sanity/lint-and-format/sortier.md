# Sortier

Sorts symbols in code files in relevant orders (usually alphabetical).

Allows you to break up symbols contextually to keep them grouped using blank lines and comments.

## Why I didn't run it on the whole project

Apart from it being inappropriately hard to set up the globs to ignore node_modules...

Blindly running it on the project re-sorts everything that may already have been grouped contextually, but not necessarily separated by spaces.
Better to run it on each file individually and be more manual about it.