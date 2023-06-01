#!/usr/bin/env bash

source "./scripts/products/for-one.sh"
source "./scripts/products/branch/get-default.sh"
source "./scripts/products/branch/ensure.sh"

product=$1
shift

version=$1
shift

function unset() {
  git submodule set-branch -d "$target"
  git pull --autostash
  ensureBranch "$(getDefaultBranch)" || exit
  echo "Done! Product '$target' is now reset to default branch."
}

forOne "unset $version" "$product"
