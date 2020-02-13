// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8080',
  apiContextPath: '/sisgea/api',
  secContextPath: '/uba-security/api',
  batchContextPath: '/sisgea-batch/api',
  agGridLicense: 'Evaluation_License_Not_For_Production_23_February_2020__MTU4MjQxNjAwMDAwMA==419f68cf54f1e1478c41a7c899c9d5e3',
  auth: false
};
