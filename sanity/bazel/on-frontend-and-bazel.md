

Bazel's sandbox requires front-end tooling to re-map its input and output paths.
Plugins to those tools are likely to have made assumptions about standard paths, and will often break.
ibazel events aren't able to be passed to directly to frontend dev servers unless their contibutors allow it
despite having programmatic APIs they're in javascript

it's been suggested (talking to guy working on webpack HMR in bazel slack) that frontend
should stay out of bazel. Frontend tools would remain compatible in that way.

Frontend dev servers are isolated anyway, nothing else will ever depend on a dev server target.
There's no need for a front-end dev server to be 'hermetic'.

Frontend dev servers could happily run from terminal, their sandbox bazel production builds for it running behind the scenes.
Meanwhile common libs and APIs are being built and deployed by bazel continuously.

The only question is: how to bridge the non-bazel front-end dev server with common deps
that are being built by bazel.

This is a much smaller problem to solve than 'how to run webpack dev server' inside bazel (after which all other tooling will probably stay broken anyway)

Paths could resolve to bazel-out.
dev servers could take advantage of plugins like next-transpile-modules to detect changes to common libs and re-bundle them.

No-pack solutions like Vite and Snowpack could skip the deps bundling altogether and simply serve them as they are compiled.

I think this is the most sensible, and most fruitful approach.