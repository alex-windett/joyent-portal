# Deployment

The project as it stands is a monorepo, each part of this prototype
(cloudapi-graphql, ui, frontend, nginx) can be found in the root directory.

We currently are using [CircleCI](https://circleci.com/gh/yldio/joyent-portal/)
for continuous deployment. As soon as a commit is push to Github, we fire a hook
off to CircleCI which kicks off our tests.

CircleCI is configured through the [circle.yaml](https://github.com/yldio/joyent-portal/blob/master/circle.yml)
found at the root of the project. The main take from this is that we install and
setup our dependencies such as docker, docker-compose, triton and yarn. CircleCI
then runs the appropriate Makefile command.

## Configuration

CircleCI is configured purely from environment variables. The current set of
variables are defined below, The SDC\_ variables are pulled directly from the
output of `triton env` and inserted into CircleCI to simplifying setting up triton-cli
in a testing environment.

We also have some \_DOCKER\_ variables, again these are used by triton, but because 
we wish to build and push the images inside CircleCI we only use them at deployment.

The docker login username and password is derived from a robot account quay.io


```
COMPOSE_HTTP_TIMEOUT
NPM_TOKEN
SDC_ACCOUNT
SDC_KEY_ID
SDC_URL
_DOCKER_CERT_PATH
_DOCKER_HOST
_DOCKER_LOGIN_PASSWORD
_DOCKER_LOGIN_USERNAME
_DOCKER_REGISTRY
_DOCKER_TLS_VERIFY
```

Other environment variables in use come directly from CircleCI, and a reference
of these can be found [here](https://circleci.com/docs/environment-variables/)

## Docker Images

Each of the service contained within the Joyent Portal repository is deployed 
using docker, the are built and tested in CI and when passing are pushed to
[Quay.io](https://quay.io/repository/) under the yldio organisation.

Images are usually built from our own base image [alpine-node-containerpilot](https://github.com/yldio/alpine-node-containerpilot)
For prosperity, the alpine-node-containerpilot is tagged in quay.io as `latest`
always points at `master`. These tags should represent the version of node being
ran `:6.4.4` and should have a postfix for any no-node changes to the image
`:6.4.4-2`.

## /.bin/deploy

This command is ran at the point when all of the tests are passing. It fires off
a call to `docker-compose -d up`. This can equally be ran on a developers machine
if manual intervention is needed.
