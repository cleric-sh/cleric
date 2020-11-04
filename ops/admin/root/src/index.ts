import {utilities} from '@cleric/ops-common';
import * as gcp from '@pulumi/gcp';
import * as pulumi from '@pulumi/pulumi';

export const dnsService = utilities.projectService('dns.googleapis.com');

export const zone = new gcp.dns.ManagedZone(
  'root',
  {
    description:
      'Top-level zone for cleric.sh, encompassing root-level DNS entries.',
    dnsName: 'cleric.sh',
    name: 'root',
  },
  {
    dependsOn: [dnsService],
  }
);
