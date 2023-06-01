

When a `container_image` target is run with `bazel run`, it is loaded into the docker host's image repository.

Running `docker image ls -a` will show a list of images whose namespaces match those in the bazel `WORKSPACE`:

```
REPOSITORY                                                             TAG                                              IMAGE ID       CREATED          SIZE
bazel                                                                  image                                            fdd1e9f0d32d   51 years ago     428MB
bazel/apps/app                                                         app_image                                        bcdbe5a3b30c   51 years ago     150MB
bazel/svcs/messenger/image                                             messenger_base                                   7bbfa763fd91   51 years ago     142MB
bazel/svcs/messenger/image                                             xyz                                              7bbfa763fd91   51 years ago     142MB
```

In the above example, the `BUILD` file at `bazel/svcs/messenger/image` defines a repository. The tags correspond to targets within the `BUILD` file.

In images created by `rules_docker`, dates are always set to 1970, so that two images with the same content hash (IMAGE ID) will be equivalent, regardless of when they are built.

You can drop into the shell of a container created from one of these images with:
```
docker run --rm -it --entrypoint sh bazel/svcs/messenger/image:messenger
```

## Delete