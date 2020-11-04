#!/usr/bin/env bash
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source ${BASE_DIR}/../.vars.sh

latest_version=316.0.0

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     build=linux;;
    Darwin*)    build=darwin;;
esac

rm -f /tmp/google-cloud-sdk-${latest_version}-${build}-x86_64.tar.gz
wget -P /tmp https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-${latest_version}-${build}-x86_64.tar.gz
tar -C /tmp -zxvf /tmp/google-cloud-sdk-${latest_version}-${build}-x86_64.tar.gz
rm -f /tmp/google-cloud-sdk-${latest_version}-${build}-x86_64.tar.gz
rm -rf /usr/local/bin/gcloud
sudo mv /tmp/google-cloud-sdk /usr/local/bin/gcloud
rm -rf /tmp/google-cloud-sdk

case "$SHELL" in
  /bin/zsh)   rc="~/.zshrc";;
  *)          rc="~/.bash_profile";;
esac

sudo chmod +w "$rc"
/usr/local/bin/gcloud/install.sh
source "$rc"

gcloud --version

gcloud auth application-default login

gcloud auth login

gcloud -q auth configure-docker

gcloud -q components install beta

gcloud -q components update

echo 'Done!'
