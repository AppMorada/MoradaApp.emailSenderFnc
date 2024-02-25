#!/bin/sh

CYAN='\033[0;36m'
ORANGE='\033[0;33m'
RESET_COLOR='\033[0m'

INFO_FLAG="[${CYAN}INFO${RESET_COLOR}]"
WARN_FLAG="[${ORANGE}WARN${RESET_COLOR}]"

gen_metadata () {
    SHA256=$(find $1 -not -wholename $2 -type f -exec sha256sum {} \; | sha256sum | sed 's/...$//')
    TIME=$(( $(date +%s%N)/1000000 ))
    
    METADATA_FILE="{\n\t\"sha256Token\": \"${SHA256}\",\n\t\"iat\": ${TIME}\n}"
    printf "%b\t" "$METADATA_FILE" | tee "${3}" > /dev/null

    return
}

build_proj() {
    echo -e "${INFO_FLAG} Applying new changes on ./dist!"
    pnpm build
    echo -e "${INFO_FLAG} Generating metadata content..."
    gen_metadata functions "*.spec.ts" "./project-metadata.dev.json"
}

echo -e "${INFO_FLAG} Starting build in watch mode..."
echo -e "${INFO_FLAG} Watching files in ./functions"

while true; do
    if test -f ./project-metadata.dev.json; then
        SHA256=$(find functions -not -wholename "*.spec.ts" -type f -exec sha256sum {} \; | sha256sum | sed 's/...$//' 2> /dev/null)
        OLD_SHA256=$(cat ./project-metadata.dev.json | jq -r .sha256Token 2> /dev/null)
  
        if [ "${SHA256}" != "${OLD_SHA256}" ]; then
            build_proj
            echo -e "${INFO_FLAG} Listening for file changes..."
        fi

        sleep 1
    else
        echo -e "${WARN_FLAG} No metadata content was found, building the project..."
        build_proj
        echo -e "${INFO_FLAG} Listening for file changes..."
    fi
done
