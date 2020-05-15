# How to generate ts project references from yarn workspaces

If you're using yarn workspaces, you're probably not pleased that you need to 
manually write project references for each tsconfig, even though yarn already
knows where to find all of your code.

In this article, we write a script that automatically configures your tsconfig
files in workspaces that reference eachother. In this way, you can keep your
`workspaces` and `package.json` dependencies as the single source of truth.

## Enumerating all workspaces

In yarn 1, we can get all workspaces by capturing the output of the 
`yarn workspaces info` command, which returns a JSON object with workspaces
as keys.

There's no clear way to access yarn 1 programmatically from nodejs scripts 
(https://github.com/yarnpkg/yarn/issues/906), so we'll have to use `execSync` 
of `child_process`, which returns the output of the script you give it.

We have to trim off the first and last lines because the output looks like this:
```
yarn workspaces v1.19.1
{
    ...
}
Done in 0.07s.
```

We can match the JSON object with the following regex:

`const regex = /({.*})/gs;`

### Notes on yarn 2

In yarn 2, `yarn workspaces list --json` will return a list in NDJSON format.
This is basically a list of JSON objects that is separated by `\n` characters.

The upside, however, is that yarn 2 exposes yarn/core as a nodejs api out of the
box, so we don't have to use `child_process`.

I don't have yarn 2 installed yet, so I'll stick to yarn 1 for now.

## Identifying the root of the monorepo

In a yarn monorepo, there is only one yarn.lock file and it's located next to the
root package.json, so this is a good marker to look for.

It's good practice that we don't assume the script will be run in the root of
the repository. We can check whether the `process.cwd()` contains a yarn.lock, and if it
doesn't progressively walk up through parents to find the root folder.

## Iterating all typescript workspaces

Using `getWorkspaces` we can get step through each workspace and check for a tsconfig.json.

If it has a tsconfig, we can load it as JSON and get any existing project references that 
might exist.

Some tsconfigs are annotated with comments, or trailing commas, so for compatibility, we can use 
the `json5` npm package to parse it, which has looser rules than `JSON.parse`.

## Load the project's package dependencies

Next, we need to know which workspace packages the project has referenced. We can compare the
`dependencies` and `devDependencies` lists in `package.json` to the package names we have in
our workspaces.

We can use `json5` to load the `package.json` file too, and iterate each list of deps, checking
for matches.