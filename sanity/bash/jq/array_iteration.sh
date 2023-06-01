
JSON='[ { "name": "FOO", "value": "BAR", "_meta": 1 }, { "name": "PING", "value": "PONG" } ]'

# Selecting one value
echo "$JSON" | jq -r ".[] | .name" |
while read -r name; do
  echo "Name: $name"
done

# Selecting a specific set of properties
echo "$JSON" | jq -r ".[] | [.name, .value] | @tsv" |
while IFS=$'\t' read -r name value; do
  echo "$name: $value"
done

# With an optional property
echo "$JSON" | jq -r ".[] | [.name, .value, .meta // empty] | @tsv" |
while IFS=$'\t' read -r name value; do
  echo "$name: $value"
done

# To a file
echo "$JSON" | jq -r ".[] | [.name, .value, .meta // empty] | @tsv" |
while IFS=$'\t' read -r name value; do
  echo "$name: $value"
done > test_output

cat ./test_output
rm ./test_output
