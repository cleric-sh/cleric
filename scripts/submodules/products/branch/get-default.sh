#!/usr/bin/env bash

function getDefaultBranch() {
  git remote show origin | grep "HEAD branch" | sed "s/.*: //"
}
