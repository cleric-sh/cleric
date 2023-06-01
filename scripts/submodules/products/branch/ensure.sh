#!/usr/bin/env bash

function ensureBranch() {
  branch=$1
  current=$(git rev-parse --abbrev-ref HEAD)
  if [ "$current" != "$branch" ]; then git switch "$branch"; fi;
}
