#!/usr/bin/env bash
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="${BASE_DIR}/.."

url=http://json.schemastore.org/$*
SCHEMA_DIR="${ROOT_DIR}/src/schemas/json/$*"

mkdir -p $SCHEMA_DIR;
SCHEMA_PATH="${SCHEMA_DIR}/index.ts"
rm $SCHEMA_PATH

echo "const $*Schema = " >> $SCHEMA_PATH
curl $url >> $SCHEMA_PATH
echo "export default $*Schema;" >> $SCHEMA_PATH