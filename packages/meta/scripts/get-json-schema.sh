#!/usr/bin/env bash
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
ROOT_DIR="${BASE_DIR}/.."

url=http://json.schemastore.org/$*
SCHEMA_DIR="${ROOT_DIR}/src/schemas/json"

mkdir -p $SCHEMA_DIR;
SCHEMA_FILENAME="$*.schema.json"
SCHEMA_PATH="${SCHEMA_DIR}/$SCHEMA_FILENAME"
INDEX_PATH="${SCHEMA_DIR}/$*.ts"
rm $SCHEMA_PATH

curl $url >> $SCHEMA_PATH

# yarn run json2ts --input $SCHEMA_PATH --output "${SCHEMA_DIR}/$*.schema.d.ts"
yarn run quicktype -s schema $SCHEMA_PATH -o $INDEX_PATH

# echo "import $*Schema from './$SCHEMA_FILENAME';" >> $INDEX_PATH
echo -e "/* eslint-disable */\nimport $*Schema from './$SCHEMA_FILENAME';\n$(cat $INDEX_PATH)" > $INDEX_PATH
echo "export { $*Schema };" >> $INDEX_PATH