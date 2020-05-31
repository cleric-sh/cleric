# yarn-project-references

Keep your typescript project references in sync with your yarn workspaces.

Iterates all yarn workspaces, updating their tsconfig files with references to their workspace dependencies.

Also generates refs for a solution file in the root directory, if you like.

Add a `.yprignore` file to the root of any workspace you want `yarn-project-references` to ignore.