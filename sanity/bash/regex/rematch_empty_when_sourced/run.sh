#!/usr/bin/env bash

# Ensures that BASH_REMATCH works if called in zsh.
setopt KSH_ARRAYS BASH_REMATCH

TEXT="FOO BAR"
REGEX="FOO (.+)"

if [[ $TEXT =~ $REGEX ]]; then 
    echo "Matched ${BASH_REMATCH[1]}"
else
    echo "No match."
fi

unsetopt KSH_ARRAYS BASH_REMATCH