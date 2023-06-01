# GitIgnore patterns

## Ignore everything except:

```gitignore
# Exclude everything by default
*/*

# Explicitly allow the following files:
!readme.md
!scripts/*
!**/*.aws.json
```

| Note: Using `**/*.*` as the 'Exclude all' won't work, see: https://github.community/t/problem-with-gitignore-file-if-directory-name-contains-dot-character/120858/8