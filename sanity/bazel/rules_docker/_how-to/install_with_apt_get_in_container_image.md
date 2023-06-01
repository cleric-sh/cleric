

You can use the `debs` arg with the `packages` function to specify packages to install in a `container_image`.

E.g.
```
container_image(
    ...
    debs = packages([
        "bash",
        "curl",
        "grep",
        "jq"
    ])
)
```