#!/usr/bin/env bash

# The base directory relative to the script file. 
# Use this to resolve scripts relative to the script's location, as opposed to the location where the script was executed ($PWD).
SCRIPTS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Source the project's .env file for this script and any scripts sourcing it.
if [[ -f '.env' ]]; then
    source .env
fi

ROOT_DIR="${SCRIPTS_DIR}/.."

DOCKER_DIR="${ROOT_DIR}/docker"
# DOTNET_DIR="${ROOT_DIR}/dotnet"
# TERRAFORM_DIR="${ROOT_DIR}/terraform"

function packageName() {
    _PACKAGE_DIR=$1
    echo $(cat $_PACKAGE_DIR/package.json | grep name | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
}

# Use this file to construct static variables for use in your scripts.
# This file is NOT for secrets. Use a .env file for that or another strategy that uses environment variables.
STACK_NAME=$(packageName $ROOT_DIR)

export COMPOSE="docker-compose -f $DOCKER_DIR/docker-compose.yaml"

# function version() {
#     _PACKAGE_DIR=$1
#     echo $(cat $_PACKAGE_DIR/package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
# }

function branch() {

    # If we are supplied BRANCH_NAME by GCP in a triggered build...
    if [[ -z $BRANCH ]]; then export BRANCH=$BRANCH_NAME; fi

    # If we are in a git repo, try loading branch from git directly.
    if [[ -z $BRANCH ]]; then export BRANCH=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,'); fi

    echo $BRANCH
}

# function tag() {
#     branch

#     if [[ $BRANCH == 'master' ]]; then export TAG='';
#     if [[ $BRANCH != 'master' ]]; then export TAG=$BRANCH;

#     echo $TAG
# }

function dockerComposeJson() {
    cat ${ROOT_DIR}/docker/docker-compose.yaml | envsubst | yq r -j -
}

function versions() {
     dockerComposeJson | jq '.services'   
}

function workspaces() {
    packageJson $ROOT_DIR | jq '.workspaces'
}

function packageJson() {
    
    cat $1/package.json | envsubst | jq '.'
}

function getStackName() {
    if [[ $STACK_NAME -eq "" ]];
    then
        export STACK_NAME=$(packageJson $ROOT_DIR | jq -r '.name')
    fi
    echo $STACK_NAME
}

function getStackPackageNamespace() {
    if [[ $STACK_PACKAGE_NAMESPACE -eq "" ]];
    then        
        export STACK_PACKAGE_NAMESPACE="@$(getStackName)/"
    fi
    echo $STACK_PACKAGE_NAMESPACE
}

function trimStackPackageNamespace() {
    echo ${1#"$(getStackPackageNamespace)"}
}

function writeVersions() {

    # Get all the yarn workspaces defined in package.json
    workspaces | jq -r '.[]' |
    while read -r WORKSPACE_ENTRY; do
        # A workspace defined in package.json might be a wildcard i.e. '*'.
        # In this case, expand them to all matching directories under the root.
        WORKSPACE_ENTRY=$(ls -d -- $ROOT_DIR/$WORKSPACE_ENTRY)        
        
        for WORKSPACE in $WORKSPACE_ENTRY; do            
            packageJson $WORKSPACE | jq -r '[.name, .version] | @tsv' |
            while ISV=$'\t' read -r package_name version; do                   
                service_name=$(trimStackPackageNamespace $package_name)                   
                echo ${service_name^^}_TAG=$version >> .versions
            done
        done        
    done
    source .versions    
    export $(cut -d= -f1 .versions)
    rm .versions
}

# writeVersions

# function tag() {
#     if [[ -z $TAG ]];
#     then
#         if [[ $CTX = 'ops' ]]; then export TAG=""; fi
#         if [[ $CTX = 'dev' ]]; then export TAG="dev"; fi
#         if [[ $CTX = 'dist' ]]; then export TAG="local"; fi
#         if [[ $CTX = 'review' ]]; then export TAG="$(branch)"; fi
#         if [[ $CTX = 'staging' ]]; then export TAG="staging"; fi    
#         if [[ $CTX = 'production' ]]; then export TAG="production"; fi
#     fi
#     echo $TAG
# }

# function imageTag() {

#     _PACKAGE_DIR=$1
#     if [[ $CTX = 'ops' ]]; then _TAG=""; fi
#     if [[ $CTX = 'dev' ]]; then _TAG="-$(tag)"; fi
#     if [[ $CTX = 'dist' ]]; then _TAG="-$(tag)"; fi
#     if [[ $CTX = 'review' ]]; then _TAG="-$(tag)"; fi
#     if [[ $CTX = 'staging' ]]; then _TAG="-$(tag)"; fi    
#     if [[ $CTX = 'production' ]]; then _TAG=""; fi
#     echo $(version $_PACKAGE_DIR)$_TAG
# }

# function targetDomain() {
    
#     if [[ -z $TARGET_DOMAIN ]];
#     then
#         if [[ $CTX = 'ops' ]]; then export TARGET_DOMAIN=$DOMAIN; fi
#         if [[ $CTX = 'dev' ]]; then export TARGET_DOMAIN=$DOMAIN; fi
#         if [[ $CTX = 'dist' ]]; then export TARGET_DOMAIN=$DOMAIN; fi
#         if [[ $CTX = 'review' ]]; then export TARGET_DOMAIN="$(branch).$DOMAIN"; fi
#         if [[ $CTX = 'staging' ]]; then export TARGET_DOMAIN="staging.$DOMAIN"; fi    
#         if [[ $CTX = 'production' ]]; then export TARGET_DOMAIN=$DOMAIN; fi
#     fi    
#     echo $TARGET_DOMAIN
# }

# function host() {
#     _NAME=$1
#     _HOST="$_NAME.$(targetDomain)"
#     _HOST="${_HOST#.}"
#     echo $_HOST
# }

# function tagOps() {
    # export DOCKER_COMPOSE_DIR=$OPS_DIR
    # export COMPOSE="docker-compose -f $DOCKER_COMPOSE_DIR/docker-compose.yaml"

#     export BUILDER_TAG=$(imageTag $OPS_DIR/images/builder)
#     export NODE_HOST_TAG=$(imageTag $OPS_DIR/images/node-host)
#     export VERDACCIO_TAG=$(imageTag $HELM_DIR/verdaccio)
# }

# function tagPackages() {
#     export DOCKER_COMPOSE_DIR=$PACKAGES_DIR
#     export COMPOSE="docker-compose -f $DOCKER_COMPOSE_DIR/docker-compose.yaml"  

#     export TARGET_DOMAIN=$(targetDomain)

#     export API_HOST=$(host $API_NAME)
#     export APP_HOST=$(host $APP_NAME)
#     export WWW_HOST=$(host $WWW_NAME)
#     export IMPORTER_HOST=$(host $IMPORTER_NAME)

#     export API_TAG=$(imageTag $PACKAGES_DIR/api)
#     export APP_TAG=$(imageTag $PACKAGES_DIR/app)
#     export WWW_TAG=$(imageTag $PACKAGES_DIR/www)
#     export LIB_TAG=$(imageTag $PACKAGES_DIR/lib)
#     export IMPORTER_TAG=$(imageTag $PACKAGES_DIR/importer)

#     export STACK_VERSION=$(version $HELM_DIR/stack)
#     export CHART_VERSION=$(imageTag $HELM_DIR/stack)
#     export CHART_NAME=$STACK_NAME-$(tag)

#     # echo "Stack $CHART_VERSION for $TARGET_DOMAIN:"
#     # echo " - $DOCKER_REGISTRY/$DOCKER_NAMESPACE/api:$API_TAG @ $API_HOST:$API_PORT"
#     # echo " - $DOCKER_REGISTRY/$DOCKER_NAMESPACE/app:$APP_TAG @ $APP_HOST:$APP_PORT"
#     # echo " - $DOCKER_REGISTRY/$DOCKER_NAMESPACE/www:$WWW_TAG @ $WWW_HOST:$WWW_PORT"
#     # echo " - $DOCKER_REGISTRY/$DOCKER_NAMESPACE/lib:$LIB_TAG"
# }

function ports {
    _PORTS_FILE=$DOCKER_DIR/ports.env
    source $_PORTS_FILE
    export $(cut -d= -f1 $_PORTS_FILE)
}

# if [[ $CTX == 'ops' ]]
# then
#     tagOps
# fi

# ports
export BRANCH=$(branch)

if [[ $CTX == 'dev' ]]
then
    # ports
    # tagPackages
    # Append our dev overrides to the dist docker-compose file in dev mode.
    COMPOSE="$COMPOSE -f $DOCKER_DIR/docker-compose.dev.yaml"
fi

# if [[ $CTX == 'review' ]]
# then        
#     # Override our local stack configuration with the cluster's
#     endpoints 'cluster'
#     tagPackages
# fi

# if [[ $CTX == 'staging' ]]
# then    
#     # Override our local stack configuration with the cluster's
#     endpoints 'cluster'   
#     tagPackages
# fi

# if [[ $CTX == 'production' ]]
# then    
#     # Override our local stack configuration with the cluster's
#     endpoints 'cluster'
#     tagPackages
# fi
