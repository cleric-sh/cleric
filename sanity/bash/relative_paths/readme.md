# Relative paths in bash

Looking up the directory containing a script file is tricky, since there are two ways to obtain the path of a script, and their behaviour is different depending on how the script was called.

E.g. if a script was executed directly from the terminal, both `BASH_SOURCE` and `$0` will return the correct relative path to it from `.`. However, in a nested script, `$0` will still refer to the original script and be incorrect.

If a script was 'sourced' directly from the terminal using `. ./my-script.sh` then `BASH_SOURCE` will incorrectly return `.`, but `$0` will correctly point to the nested directory.

One of the two methods is able to return the correct path, depending on the context.

## src

The source function is designed to fall back to $0 when BASH_SOURCE returns blank or `.`. In the case that blank is returned, we know that the only other viable alternative is `$0`. In the case that the result is `.`, we want to check that the directory is in fact the same as the `PWD`. If it's not we should return the directory described in the command used to invoke the script.