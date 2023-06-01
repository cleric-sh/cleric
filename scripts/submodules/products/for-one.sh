#!/usr/bin/env bash

function forOne() {
  cmd=$1
  shift

  product=$1
  shift

  # Get a list of all submodules in the repository
  submodules=$(git submodule status | sed -e "s/^[\+ ][^ ]* //" -e "s/(.*)$//")

  # If a product argument was provided, filter the available submodules by it
  targets="$(echo "$submodules" | grep "$product")"

  # If a product argument was provided, ensure it matches exactly one product
  if [ -z "$targets" ]; then echo "Argument '$product' didn't match the paths of any product submodules. Available products are:"; echo "$submodules" | sed -e "s/^/ - /"; exit; fi

  count=$(echo "$targets" | wc -l)
  if [ "$count" -ne 1 ]; then echo "Argument '$product' matched more than one product submodule:"; echo "$targets" | sed -e "s/^/ - /"; exit; fi

  for target in $targets; do
    eval "$cmd"
  done
}
