#!/usr/bin/env bash

set -e

ID=XAHD2384FDJ

rm -rf "./$ID"

gh repo create "martaver/$ID" --template "Jetbrains/intellij-platform-plugin-template" --clone --private
gh repo delete "martaver/$ID" --confirm
