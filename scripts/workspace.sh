#!/usr/bin/env bash
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source ${BASE_DIR}/.vars.sh

# Extract the first argument as the workspace name param.
name=$1
shift 1

# Match each workspace against the workspace name passed in as first param.
yarn workspaces info | jq -r 'keys | .[]' | while IFS=$'' read -r workspace; do
if [[ $workspace =~ $name ]]; then
    # If the param matches a workspace, run the rest of the commands in the workspace.
    echo "Running in workspace $workspace:"
    yarn workspace $workspace "$@"
fi
done