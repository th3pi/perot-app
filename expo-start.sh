#!/bin/sh
parent_path=$(
    cd "$(dirname "${BASH_SOURCE[0]}")"
    pwd -P
)
localIp=$(ipconfig getifaddr en0)
echo $localIp
cd "$parent_path"
cd perotExperience
npm i
npm run start
