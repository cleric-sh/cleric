import {set, trimStart, unset} from 'lodash';
import {PackageJson} from '../getPackageJson';
import {WorkspaceInfo} from '../getWorkspaceInfo';

export const ensurePackageJsonEntry = (
  ws: WorkspaceInfo,
  newPackgeJsonSettings: PackageJson
) => {
  const outDir = ws.tsConfigJson.effective.compilerOptions?.outDir || 'dist';

  const main = `${outDir}/index.js`;

  if (
    !ws.packageJson.main ||
    !trimStart(ws.packageJson.main, './').startsWith(outDir)
  ) {
    console.log(`  - Setting 'main' in 'package.json' to '${main}'`);
    set(newPackgeJsonSettings, 'main', `${main}`);
  }

  const types = main.replace('.js', '.d.ts');

  if (ws.packageJson.types !== types) {
    console.log(`  - Setting 'types' in 'package.json' to '${types}'`);
    set(newPackgeJsonSettings, 'types', `${types}`);
  }

  if (ws.packageJson['local:main']) {
    console.log(`  - Removing 'local:main' in 'package.json'`);
    unset(newPackgeJsonSettings, 'local:main');
  }
};
