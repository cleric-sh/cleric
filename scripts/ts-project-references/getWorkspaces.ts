import {execSync} from 'child_process';

export const getWorkspaces = () => {
  const workspaces = execSync('yarn workspaces info', {encoding: 'utf8'});
  const regex = /({.*})/gs;
  const match = regex.exec(workspaces);

  if (!match)
    throw 'No workspaces JSON object found in output - are you using workspaces?';

  return JSON.parse(match[0]);
};
