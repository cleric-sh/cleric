#!/usr/bin/env bash

#echo BASH_SOURCE_0: "${BASH_SOURCE[0]}"
#echo \$0: "$0"

echo $(realpath "$0")

#printf "\n"
#echo "Test 'src \$0' should return script's actual path, even when nested:"
$(dirname $0)/nested/exec-src.sh
#
#printf "\n"
#echo "Test 'src \$0' should return script's actual path, even when nested and sourced:"
#. $(dirname $0)/nested/exec-src.sh
