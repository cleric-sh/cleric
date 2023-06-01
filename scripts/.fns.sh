#!/usr/bin/env bash

# Return the elements that both lists have in common.
function intersect() {
  sort <(echo "$1" | sort) <(echo "$2" | sort) | uniq -d
}

# Return the elements that neither list has in common.
function diff() {
  sort <(echo "$1" | sort) <(echo "$2" | sort) | uniq -u
}

# Return the elements in the first list that don't exist in the second list.
function diffLeft() {
  intersect "$1" "$(diff "$1" "$2")"
}

# Return the elements in the second list that don't exist in the first list.
function diffRight() {
  intersect "$2" "$(diff "$1" "$2")"
}

function forEachOrOne() {
  cmd=$1
  list=$2
  filter=$3

  # If a filter argument was provided, filter the available elements by it
  targets="$(echo "$list" | grep "$filter")"

  # If a filter argument was provided, ensure it matches exactly one element
  if [ -n "$filter" ]; then
    if [ -z "$targets" ]; then echo "Argument '$filter' didn't match the paths of any the specified elements. Elements are:"; echo "$list" | sed -e "s/^/ - /"; exit; fi
    count=$(echo "$targets" | wc -l)
    if [ "$count" -ne 1 ]; then echo "Argument '$filter' matched more than one element:"; echo "$targets" | sed -e "s/^/ - /"; exit; fi
  fi

  for target in $targets; do
    eval "$cmd $target"
  done
}
