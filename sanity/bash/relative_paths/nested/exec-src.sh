#!/usr/bin/env bash

. ./.vars.sh

echo BASH_SOURCE_0: "${BASH_SOURCE[0]}"
echo \$0: "$0"

expect $(src $0) "./nested"

printf "\n"
echo "Test 'src \$0' should return script's actual path, even when nested:"
$(src $0)/nested/exec-src.sh

printf "\n"
echo "Test 'src \$0' should return script's actual path, even when nested and sourced:"
. $(src $0)/nested/exec-src.sh