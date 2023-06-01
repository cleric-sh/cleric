#!/usr/bin/env bash

source "./scripts/products/for-each.sh"
source "./scripts/products/branch/get.sh"
source "./scripts/products/branch/ensure.sh"
source "./scripts/products/branch/get-default.sh"

function push() {
  (
    branch=$(getBranch "$target")
    cd "$target" || exit;
    ensureBranch "$branch"
    toPush=$(git log origin/"$branch".."$branch")
    if [ -n "$toPush" ]; then
      echo "Pushing $target:$branch ..."
      git push
      echo ""
    else
      echo "$target - Everything up-to-date"
    fi
  ) &
}

forEach "push" "$1"
wait
