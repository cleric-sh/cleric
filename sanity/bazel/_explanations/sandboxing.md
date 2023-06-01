# Bazel Sandboxing

https://docs.bazel.build/versions/master/sandboxing.html

## Linux

Uses `containers`.

https://www.opensourceforu.com/2016/07/many-approaches-sandboxing-linux/#:~:text=Sandboxing%20involves%20providing%20a%20safe,available%20in%20the%20Linux%20kernel.

## MacOS

Uses `sandbox-exec`.

A quick glance at macOS' sandbox-exec
https://jmmv.dev/2019/11/macos-sandbox-exec.html#:~:text=macOS%20includes%20a%20sandboxing%20mechanism,be%20executed%2C%20and%20much%20more.

## What's the deal with sandboxfs?

[todo] 

Is it a direct dep of bazel, or does bazel only use it optionally?

Is it so that it's supposed to provide performance benefits?

What's the deal with sandbox debugging, if I install sandboxfs, then it will leave
files for inspection in the sandbox folder?