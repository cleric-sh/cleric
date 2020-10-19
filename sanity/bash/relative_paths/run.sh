#!/usr/bin/env bash

printf "\n"
echo "Test 'src \$0' should return script's actual path, even when nested:"
./nested/exec-src.sh

printf "\n"
echo "Test 'src \$0' should return script's actual path, even when nested and sourced:"
. ./nested/exec-src.sh