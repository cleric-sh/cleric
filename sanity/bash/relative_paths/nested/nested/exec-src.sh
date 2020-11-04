#!/usr/bin/env bash

. $(dirname $0)/../../.vars.sh

echo BASH_SOURCE_0: "${BASH_SOURCE[0]}"
echo \$0: "$0"

echo $(src "$0")
