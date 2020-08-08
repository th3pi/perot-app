#!/bin/sh
parent_path=$(
    cd "$(dirname "${BASH_SOURCE[0]}")"
    pwd -P
)

cd "$parent_path"
open -a Terminal start.sh
cd perot-backend/
npm i
npm run database
