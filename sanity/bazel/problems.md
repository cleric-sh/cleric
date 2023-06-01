


# Files missing

## Using create-react-app

```
Could not find a required file.
Name: index.html
Searched in: /private/var/tmp/_bazel_martaver/5322470bafb612b10359284866942bf7/execroot/cleric/bazel-out/darwin-fastbuild/bin/app/app.sh.runfiles/cleric/public
```

Explanation:
`nodejs_binary` commands get run in the workspace root, regardless of their location.
`react-scripts` is running in the workspace root, and so can't find public/index.html.

Solution:
specify `chdir = package_name()` when invoking the `react_scripts` `nodejs_binary`.



## Can't find transitive dependencies

Scenario:
When you have two different BUILD targets `A` -> `B`... 
and `B` declares `react` as a dep in `package.json` (for example), 
When `react` has a dependency on `object-assign`.
Then `object-assign` is known as a _transitive dependency_.

If `A` were to import `object-assign`, then:

When building in your FS it would be possible, since it exists in `node_modules`.

When building in `bazel`, it'll fail, since it's explicit about which dependencies build targets have access to.

Explanation:
`rules_nodejs` hides transitive dependencies from anything except for their direct parent, by default.
This is the `strict_visibility` option (True by default) available on `yarn_install` and `npm_install` rules.

Solution:
Explicitly define the dependency in the build rule's deps.