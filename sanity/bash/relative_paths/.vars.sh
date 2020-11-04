#!/usr/bin/env bash

# Gets the base common containing this .vars file.
# This var can be used in sourcing scripts for building paths relative to the repository root.
ROOT=$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd)

. "$ROOT/../.test.sh"

# Gets the base common containing the script that called this .vars file.
# This var can be used in sourcing scripts for building paths relative to the script itself.
#
# When used with 'dot/source' notation, BASH_SOURCE returns the dir of the sourcing file.
# In that case, the function falls back to using the $0 dirname of the calling script,
# passed as an argument.
#
# Usage: $(src $0)
src() {
  local DIRNAME="$(dirname "${BASH_SOURCE[1]}")"

  if [[ $DIRNAME == "" || $DIRNAME == "." ]]; then
    DIRNAME="$(dirname "$1")"
  fi

  echo "$DIRNAME"
}

expand() {
  cd "$1" >/dev/null 2>&1 && pwd
}
