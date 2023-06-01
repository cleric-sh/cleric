#!/usr/bin/env bash

source "./scripts/products/for-one.sh"
source "./scripts/products/branch/ensure.sh"

product=$1
shift

branch=$1
shift

function setBranch() {
  (
    git submodule set-branch -b "$branch" "$target"
    cd "$target" || exit
    git pull --autostash
    ensureBranch "$branch"
    echo "Done! Product '$target' is now set to branch '$branch'."
  )
}

forOne "setVersion" "$product"
