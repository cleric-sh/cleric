
# dockerfile_image

Rule:
https://github.com/bazelbuild/rules_docker/blob/master/contrib/dockerfile_build.bzl

Example:
```
http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "95d39fd84ff4474babaf190450ee034d958202043e366b9fc38f438c9e6c3334",
    strip_prefix = "rules_docker-0.16.0",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.16.0/rules_docker-v0.16.0.tar.gz"],
)

load("@io_bazel_rules_docker//contrib:dockerfile_build.bzl", "dockerfile_image")



dockerfile_image(
    name = "base",
    dockerfile = "//path/to:Dockerfile",

)

```