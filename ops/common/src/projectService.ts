import * as gcp from '@pulumi/gcp';

export const projectService = (service: string, prefix = 'enable') =>
  new gcp.projects.Service(`${prefix}-${service}`, {service});
