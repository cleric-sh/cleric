#!/usr/bin/env bash
source "./scripts/.fns.sh"
source "./scripts/subtrees/.vars.sh"

function addSubtree() {
  path=$1
  repository_url=$2
  branch=${3:-$default_branch}
  git subtree add --prefix "$path" "$repository_url" "$branch" --squash
}

function rmSubtree() {
  path=$1
  git rm -rf "$path"
}

function lsSubtrees() {
  # Inspect the git log for subtree dirs, and list them if the dir exists
  git log | grep git-subtree-dir | tr -d ' ' | cut -d ":" -f2 | sort | uniq | xargs -I {} bash -c 'if [ -d $(git rev-parse --show-toplevel)/{} ] ; then echo {}; fi'
}

function pullSubtree() {
  path=$1
  repository_url=$(getSubtreeUrl "$path")
  branch=${3:-$default_branch}
  git subtree pull --prefix "$path" "$repository_url" "$branch" --squash
}

function pullSubtrees() {
  paths=$(lsSubtrees)
  forEachOrOne "pullSubtree" "$paths" "$1"
}

function pushSubtree() {
  path=$1
  repository_url=$(getSubtreeUrl "$path")
  branch=${3:-$default_branch}
  git subtree push --prefix "$path" "$repository_url" "$branch"
}

function pushSubtrees() {
  paths=$(lsSubtrees)
  forEachOrOne "pushSubtree" "$paths" "$1"
}

function getExpectedSubtrees() {
  jq -r 'keys[]' "$subtrees_json_path"
}

function getSubtreeUrl() {
  path=$1
  jq -r ".\"$path\"" "$subtrees_json_path"
}

function getSubtreesToAdd() {
  diffLeft "$(getExpectedSubtrees)" "$(lsSubtrees)"
}

function getSubtreesToRm() {
  diffRight "$(getExpectedSubtrees)" "$(lsSubtrees)"
}

function initSubtrees() {
  pathsToAdd=$(getSubtreesToAdd)
  pathsToRemove=$(getSubtreesToRm)

  if [ -z "$pathsToAdd" ] && [ -z "$pathsToRemove" ]; then
    echo "All subtrees up-to-date!"
    exit
  fi

  # Add subtrees first, because this will automatically commit,
  # and allow rm to be done on a clean working tree

  for path in $pathsToAdd; do
    echo "Adding $path:"
    url=$(getSubtreeUrl "$path")
    addSubtree "$path" "$url"
    echo ""
  done

  for path in $pathsToRemove; do
    echo "Removing $path:"
    rmSubtree "$path"
    echo ""
  done

  if [ -n "$pathsToRemove" ]; then
    echo "Note: Subtrees were removed, but changes were not committed yet. Check your working tree! (git status)"
    exit
  fi
}
