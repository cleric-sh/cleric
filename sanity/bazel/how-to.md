
## Specify a custom Node version for bazel to use
https://bazelbuild.github.io/rules_nodejs/Built-ins.html#custom-nodejs-versions

## Specify a custom Yarn version for bazel to use
https://bazelbuild.github.io/rules_nodejs/Built-ins.html#custom-yarn-versions

## Debug a sandbox file system error (missing files errors in a rule)

Run the bazel command with `--verbose_failures` and `--sandbox_debug`.

Verbose failures will give you the command that was run, in a format that you can copy and paste in order
to produce a new terminal at the sandbox with state at the error.

Related article: https://blog.bazel.build/2016/03/18/sandbox-easier-debug.html

## Inspect the contents of a sandbox

Use `--sandbox_debug` option, and it will leave the `output_base` sandbox untouched once execution is finished.
It does not matter if the build succeeded or failed.

You can get the `output_base` dir for the current `WORKSPACE` by running the command: 

```bash
bazel info output_base
```

or
```bash
$(bazelisk info output_base)/sandbox
```

or
```json
{
  "scripts": {
    "bzl:open": "sh -c \" open -a iTerm $(bazelisk info output_base)/sandbox\""
  }
}
```

## Inspect the contents of a genrule

You can add the good old `ls -a` to the genrule's `cmd`.

Also, apparently `find . > $@` will output a list of all files and dirs to the output of the genrule.

> Source: https://stackoverflow.com/questions/54543744/how-to-avoid-deleting-cached-files-after-build-in-bazel

