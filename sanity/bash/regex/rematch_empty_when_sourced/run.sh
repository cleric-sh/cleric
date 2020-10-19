#!/usr/bin/env bash

TEXT="FOO BAR"
REGEX="FOO (.+)"

if [[ $TEXT =~ $REGEX ]]; then 
    echo "Matched ${BASH_REMATCH[1]}"
else
    echo "No match."
fi