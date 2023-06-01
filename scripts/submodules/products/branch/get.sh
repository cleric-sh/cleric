#!/usr/bin/env bash

source "./scripts/products/branch/get-default.sh"

function getBranch() {
  target=$1
  # Get the branch the submodule is pinned to
  branch="$(git config -f ./.gitmodules submodule."$target".branch)"

  # If the submodule isn't pinned to a branch, look up the default branch
  if [ -z "$version" ]; then
    branch="$(getDefaultBranch)"
  fi
  echo "$version"
}
