import * as gcp from '@pulumi/gcp';
import * as pulumi from '@pulumi/pulumi';

export const billingAccount = gcp.organizations
  .getBillingAccount({
    displayName: 'Cleric Billing Account',
  })
  .then(acc => acc.id);

export const ROOT = 'cleric-root';
export const root = new gcp.organizations.Project(ROOT, {
  billingAccount,
  name: ROOT,
  projectId: ROOT,
});

export const DEVELOPMENT = 'cleric-development';
export const development = new gcp.organizations.Project(DEVELOPMENT, {
  billingAccount,
  name: DEVELOPMENT,
  projectId: DEVELOPMENT,
});

export const STAGING = 'cleric-staging';
export const staging = new gcp.organizations.Project(STAGING, {
  billingAccount,
  name: STAGING,
  projectId: STAGING,
});

export const PRODUCTION = 'cleric-production';
export const production = new gcp.organizations.Project(PRODUCTION, {
  billingAccount,
  name: PRODUCTION,
  projectId: PRODUCTION,
});
