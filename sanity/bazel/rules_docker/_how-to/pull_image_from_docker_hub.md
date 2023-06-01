

```

http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "95d39fd84ff4474babaf190450ee034d958202043e366b9fc38f438c9e6c3334",
    strip_prefix = "rules_docker-0.16.0",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.16.0/rules_docker-v0.16.0.tar.gz"],
)

load("@io_bazel_rules_docker//container:container.bzl", "container_pull")

container_pull(
    name = "bitnami_minideb",
    registry ="index.docker.io",
    repository = "bitnami/minideb-extras",
    # repository = "node",
    tag = "jessie",
)

# Refer to the pulled image in another container rule:
#
# base = "@<target>//image"
#
container_image(
    name = "base",
    base = "@node-slim//image"
)
```