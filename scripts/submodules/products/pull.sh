#!/usr/bin/env bash

source "./scripts/products/for-each.sh"
source "./scripts/products/branch/get.sh"
source "./scripts/products/branch/ensure.sh"

function pull() {
  (
    # Notify the user of the submodule being pulled (and the branch)
    echo Pulling "$target:$branch ..."

    # Ensure that all local submodules are initialized and have the latest commits for their branch, pulled from remote
    git submodule update --init "$target"

    # Get the branch the submodule is pinned to
    branch=$(getBranch "$target")

    cd "$target" || exit;

    ensureBranch "$branch"
  ) &
}

forEach "pull" "$1"
wait
