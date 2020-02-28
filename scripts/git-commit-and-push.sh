#!/usr/bin/env bash
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source ${BASE_DIR}/.vars.sh

set -e # Sets mode to exit on an error, without executing the remaining commands.

source $BASE_DIR/git-commit.sh

# Check if there's a remote tracked branch. If there is, automatically push.
# This skips the push when working from a local branch.
TRACKED_BRANCH="$(git config --get branch.$BRANCH.merge || true)"
if [[ ! -z $TRACKED_BRANCH ]]; then
    echo "Detected tracked branch: $TRACKED_BRANCH"
    echo "Pushing..."
    git push
fi