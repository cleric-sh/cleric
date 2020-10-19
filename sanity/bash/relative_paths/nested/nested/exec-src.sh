#!/usr/bin/env bash

. ./.vars.sh

echo BASH_SOURCE_0: "${BASH_SOURCE[0]}"
echo \$0: "$0"

expect $(src "$0") "./nested/nested"