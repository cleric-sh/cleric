#!/usr/bin/env bash
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source ${BASE_DIR}/.vars.sh

set -e # Sets mode to exit on an error, without executing the remaining commands.

# If we are in the master branch, or master branch on a remote,
# exit to prevent accidental commits to the branch, which can
# cause a few painful situations if the commit goes unnoticed.
if [[ $BRANCH =~ (master$) ]]; then
    echo "Detected accidental commit to master, exiting..."
    exit 0
fi

# Extracts JIRA issue number from current branch name, if one exists.
if [[ $BRANCH =~ ($JIRAKEY-[0-9]+) ]]; then
    export ISSUE=${BASH_REMATCH[1] };
    echo "Detected JIRA issue: $ISSUE"
fi

if [ -z "$*" ]; then
    "No commit message provided."
    exit 0
fi

git add .
git commit -m "$ISSUE$*"
