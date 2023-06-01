# SSH

Manual: https://linux.die.net/man/1/ssh

## ssh-agent

Source: https://www.ssh.com/academy/ssh/agent

`ssh-agent` stores credentials, and makes them available to the SSH client automatically.


## Jumping hosts

In this scenario, you may want to forward packets or get a secure shell to a private host that is only accessible through another machine.
E.g. when a machine is a part of a private VPC, and only a bastion host is available to forward SSH connections to it.

In this case, bastion is just the 'AWS' term for a machine that acts as a secure gateway to private hosts.

`-J <bastion>` is equivalent to `-o ProxyCommand="ssh -W %h:%p <bastion>""`

When jumping hosts, using `ssh-agent` makes it possible to pass credentials to nested hosts with the `-A` argument. 
Without this, authentication from the bastion host to the desired host will fail, since credentials from the base ssh command are not passed to the nested ssh session.

E.g. `autossh -M 2000 -f -N -A -4 -o StrictHostKeyChecking=no -o ProxyCommand="ssh -o StrictHostKeyChecking=no -W %h:%p ec2-user@$BASTION" $TUNNELS ec2-user@$THROUGH`