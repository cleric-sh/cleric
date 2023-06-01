#!/usr/bin/env bash

set -e

source "./scripts/subtrees/.fns.sh"

pullSubtrees "$1" "$2"
