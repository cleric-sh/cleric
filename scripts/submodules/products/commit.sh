#!/usr/bin/env bash

source "./scripts/products/for-one.sh"
source "./scripts/products/branch/get.sh"
source "./scripts/products/branch/ensure.sh"

product=$1
shift

commitargs=$@

function commit() {
  (
    # Get the branch the submodule is pinned to
    branch=$(getBranch "$target")

    cd "$target" || exit;

    ensureBranch "$branch"

    git add .
    if [ -z "$commitargs" ]; then
      if git commit; then echo ""; fi
    else
      if git commit "$commitargs"; then echo ""; fi
    fi

  )
}

forOne "commit" "$product"
