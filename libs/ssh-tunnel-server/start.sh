#!/usr/bin/env bash

SRC=$(cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd)

source "$SRC/.vars.sh"

source "$SRC/etc_hosts.sh"

PROFILE=$1

SSH_TUNNEL_SERVER_PROFILES_PATH="${SSH_TUNNEL_SERVER_PROFILES_PATH:-./tunnels.json}"
PROFILES_PATH=${SSH_TUNNEL_SERVER_PROFILES_PATH//\.\//$ROOT/}

# Load all our endpoint port forwarding configurations from a JSON file.
PROFILES=$(cat $PROFILES_PATH | jq -r ".$PROFILE.endpoints[] | [.host] | @tsv")

echo "Creating /etc/hosts for profile '$PROFILE':"

sudo echo "Got sudo..."

echo "$PROFILES" |
while IFS=$'\t' read -r host; do
  addHost $host
done

TMP_ENV_PATH=/tmp/tunnel_server_session.env

cat > $TMP_ENV_PATH <<- EOM
PROFILE=$PROFILE
SSH_TUNNEL_SERVER_CERTIFICATE_PATH=$SSH_TUNNEL_SERVER_CERTIFICATE_PATH
SSH_TUNNEL_SERVER_PROFILES_PATH=$PROFILES_PATH
EOM

cat $TMP_ENV_PATH
docker-compose --env-file $TMP_ENV_PATH -f $SRC/docker/docker-compose.yml up --build

rm $TMP_ENV_PATH

sudo echo "Got sudo..."

echo "$PROFILES" |
while IFS=$'\t' read -r host; do      
  removeHost $host
done