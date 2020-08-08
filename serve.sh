#!/bin/sh
parent_path=$(
    cd "$(dirname "${BASH_SOURCE[0]}")"
    pwd -P
)
cd "$parent_path"
open -a Terminal expo-start.sh
cd perot-service
npm i
npm run serve
