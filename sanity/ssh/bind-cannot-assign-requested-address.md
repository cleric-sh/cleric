
When trying to establish port forwarding, you might get:

```
$ ssh -L 8080:127.0.0.1:80 dev.local
bind: Cannot assign requested address
```

https://www.electricmonk.nl/log/2014/09/24/ssh-port-forwarding-bind-cannot-assign-requested-address/

This might be because SSH is trying to bind on an IPv6 address.

Try adding the `-4` argument.