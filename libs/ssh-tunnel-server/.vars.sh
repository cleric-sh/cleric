#!/usr/bin/env bash

# Gets the base directory containing this .vars file.
# This var can be used in sourcing scripts for building paths relative to the repository root.
ROOT="$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd)/.."

# Gets the base directory containing the script that called this .vars file.
# This var can be used in sourcing scripts for building paths relative to the script itself.
#
# When used with 'dot/source' notation, BASH_SOURCE returns the dir of the sourcing file.
# In that case, the function falls back to using the $0 dirname of the calling script,
# passed as an argument.
src() {
  local DIRNAME="$(dirname "${BASH_SOURCE[1]}")"
  if [[ $DIRNAME == "" || $DIRNAME == "." ]]; then
    DIRNAME="$(dirname "$1")"
  fi

  cd "$DIRNAME" >/dev/null 2>&1 && pwd
}

# Load local secrets and user-specific settings.
# shellcheck source=.env
source "$ROOT/.env"
