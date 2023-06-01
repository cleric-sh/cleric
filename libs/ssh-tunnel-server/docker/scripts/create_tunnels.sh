#!/usr/bin/env bash

# Load the through host and endpoints from the selected profile.
THROUGH=$(cat /tunnels.json | jq -r ".$PROFILE.through")
ENTRIES=$(cat /tunnels.json | jq -r ".$PROFILE.endpoints[] | [.host, .port // empty] | @tsv")

echo "Creating tunnels for profile '$PROFILE' through '$THROUGH':"

function RANDOM_UNUSED_PORT() {
  while true
  do
    MIN=1024
    MAX=49151
    random_port=$(( ( RANDOM % "$MAX" ) + "$MIN" ))
    status="$(nc -z 127.0.0.1 $random_port < /dev/null &>/dev/null; echo $?)"
    if [ "${status}" != "0" ]; then
      echo "$random_port";
      exit;
    fi
  done
}

# Format the correct arguments for 'ssh' and 'nginx.conf'.
# We write them to a tmp file and read that later because using the | operator 
# creates a new subshell which prevents us from writing to variables.
echo "$ENTRIES" |
while IFS=$'\t' read -r host port; do
  port=${port:-$(RANDOM_UNUSED_PORT)}
  echo "- '$host' at port '$port'..."    
  printf " -L $port:$host:443" >> /tmp/tunnels
  printf "        $host $port;\n" >> /tmp/nginx.conf.map
  printf "    upstream $port { server 127.0.0.1:$port; }\n" >> /tmp/nginx.conf.upstream
done

# Read the command args for 'ssh' and 'nginx.conf'
TUNNELS=$(cat /tmp/tunnels)
MAP=$(cat /tmp/nginx.conf.map)
UPSTREAM=$(cat /tmp/nginx.conf.upstream)

# Tidy up the tmp files
rm -f /tmp/tunnels
rm -f /tmp/map
rm -f /tmp/endpoints

# Load nginx.conf and replace the $MAP and $UPSTREAM placeholders with the hosts and
# ports of the endpoints listed in the selected profile
NGINX_CONF=$(cat /etc/nginx/nginx.conf)
NGINX_CONF=${NGINX_CONF//\$MAP/"$MAP"}
NGINX_CONF=${NGINX_CONF//\$UPSTREAM/"$UPSTREAM"}
echo "$NGINX_CONF" > /etc/nginx/nginx.conf

# SSH to the through host instance and create a port forwarding tunnel for each
# entry configured in the JSON file. Detach the ssh process and run it in the background.
# 
# We disabled the shellcheck to prevent it from quoting the env variables, since that
# confuses the ssh command.
#
# shellcheck disable=SC2086
ssh -4 -o StrictHostKeyChecking=no -i /cert.pem -f -N $TUNNELS ec2-user@$THROUGH