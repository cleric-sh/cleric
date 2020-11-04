#!/usr/bin/env bash

. ./../.test.sh

#
# Return a specific value
#

function get_specific_value {
    echo "Specific Value"
}

if SPECIFIC_VALUE=$(get_specific_value); then
  expect "$SPECIFIC_VALUE" "Specific Value"
else
  echo "Error - $?"
fi

#
# Return a multiple values
#

function set_multiple_values {
    FIRST_VALUE="First Value"
    SECOND_VALUE="Second Value"
}

if set_multiple_values; then
    expect "$FIRST_VALUE" "First Value"
    expect "$SECOND_VALUE" "Second Value"
else
    echo "Error - $?"
fi


#
# Return an error
#

function get_error {
    echo "My Error Msg"
    return 1
}

if RESULT=$(get_error); then
    echo "Shouldn't have arrived here"
else
    expect "Error - $? - $RESULT" "Error - 1 - My Error Msg"
fi


#
# Retry on error
#

function try_get_value {
    if [[ $1 == "Foo" ]]; then
      echo "Bar"
    else
      echo "My Error Msg"
      return 1
    fi
}

RESULT=$(try_get_value "Foo"); case $? in
  0 ) echo "Success: $RESULT" ;;
  1 ) echo "Failed: $RESULT" ;;
  * ) echo 'Unknown' ;;
esac

# Try the call in one configuration
if ! RESULT=$(try_get_value); then
    # When it fails, try the call again in a different configuration.
    RESULT=$(try_get_value "Foo")
    expect "$RESULT" "Bar"
fi
