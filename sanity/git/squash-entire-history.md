# Squash entire history

You might want to use this to:
- reduce a repository's entire commit history down to a single commit.
```
git reset $(git commit-tree HEAD^{tree} -m "Initial commit (squashed from messy history)")
```
