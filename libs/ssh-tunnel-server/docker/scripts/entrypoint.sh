#!/usr/bin/env bash

set -e

/scripts/create_tunnels.sh
/docker-entrypoint.sh "$@"