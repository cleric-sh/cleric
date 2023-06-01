
When using `container_run_and_commit`, such as:
```
container_run_and_commit(
    ...
    image = ":base",
    ...    
)
```

Error like:
```
Unable to extract manifest.json, make sure bazel-out/darwin-fastbuild/bin/images/build/*/*-layer.tar is a valid docker image.
 "filename 'manifest.json' not found"
```

Then:

Ensure '.tar' file extension is added to the bazel target, e.g.

```
container_run_and_commit(
    ...
    image = ":base.tar",
    ...    
)
```