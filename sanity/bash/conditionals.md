
# Run if command succeeds:

```bash
if my-cmd ; then
  echo "Success!"
fi
```

# Run if command succeeds (silently):

```bash
if my-cmd &> /dev/null ; then
  echo "Success!"
fi
```